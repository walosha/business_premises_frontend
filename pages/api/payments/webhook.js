import connectDB from "lib/mongodb";
import Payment from "lib/models/Payment";
import Invoice from "lib/models/Invoice";
import { generateHMAC256Auth } from "utils/generateHMAC256Auth";
import { withSentry } from "@sentry/nextjs";
// import Businesses from "lib/models/Businesses";

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			// Update or create data in your database
			createPayment(req, res);
			break;

		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function createPayment(req, res) {
	const {
		InvoiceNumber,
		Mac,
		AmountPaid,
		PaymentRef,
		RequestReference,
		...others
	} = req.body;
	const concatString =
		InvoiceNumber + PaymentRef + AmountPaid + RequestReference;
	console.log(generateHMAC256Auth(concatString), Mac);
	const concatStringWithoutNull =
		InvoiceNumber + PaymentRef + AmountPaid + RequestReference;
	console.log({ concatStringWithoutNull });

	const isvalid = generateHMAC256Auth(concatString) === Mac;
	console.log({ isvalid });
	if (InvoiceNumber) {
		try {
			const invoice = await Invoice.findOne({ InvoiceNumber });
			if (invoice?.status == 1) {
				return res.status(200).json({ message: "Duplicate record" });
			}

			if (invoice) {
				await Payment.create({
					...others,
					InvoiceNumber,
					AmountPaid,
					...others,
					PaymentRef,
					Mac,
					RequestReference,
					invoice_id: invoice._id,
				});
			}

			await Invoice.findOneAndUpdate(
				{ InvoiceNumber },
				{ $set: { status: 1, paidSoFar: AmountPaid } },
				{ new: true }
			);

			return res.status(200).json({});
		} catch (error) {
			return res.status(500).json({ success: false, data: error.message });
		}
	}
	return res.status(500).json({ success: false, data: "Fill all fields" });
}

module.exports = withSentry(connectDB(userHandler));
