import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Payment from "lib/models/Payment";
import Invoice from "lib/models/Invoice";
// import Businesses from "lib/models/Businesses";
import { pageOptions } from "lib/models/paginate";

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			// Update or create data in your database
			createPayment(req, res);
			break;
		case "GET":
			// Update or create data in your database
			getAllPayments(req, res);
			break;
		default:
			res.setHeader("Allow", ["POST", "GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function createPayment(req, res) {
	const { InvoiceNumber, AmountPaid, ...others } = req.body;

	if (InvoiceNumber) {
		try {
			const invoice = await Invoice.findOneAndUpdate(
				{ InvoiceNumber },
				{ $set: { status: 1, paidSoFar: AmountPaid } },
				{ new: true }
			);
			if (invoice) {
				await Payment.create({
					...others,
					InvoiceNumber,
					AmountPaid,
					...others,
					invoice_id: invoice._id,
				});
			} else {
				payment = await Payment.create(req.body);
			}

			return res.status(200).json({});
		} catch (error) {
			return res.status(500).json({ success: false, data: error.message });
		}
	}
	return res.status(500).json({ success: false, data: "Fill all fields" });
}

async function getAllPayments(req, res) {
	const { id, page = 1 } = req.query;

	try {
		if (id) {
			let invoice = await Payment.findById(id).populate();
			return res.status(200).json({ success: true, data: invoice });
		}

		let payments = await Payment.paginate(
			{},
			{ ...pageOptions, page, offset: page * 5, sort: "-updated_at" }
		);
		return res.status(200).json({ success: true, data: payments });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = connectDB(withProtect(userHandler));
