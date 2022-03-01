import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Payment from "lib/models/Payment";
import Invoice from "lib/models/Invoice";
// import Businesses from "lib/models/Businesses";
import { pageOptions } from "lib/models/paginate";
import { withSentry } from "@sentry/nextjs";

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			// Update or create data in your database
			getAllPayments(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function getAllPayments(req, res) {
	const { id, page = 1, text } = req.query;

	try {
		if (id) {
			let invoice = await Payment.findById(id).populate();
			return res.status(200).json({ success: true, data: invoice });
		}

		let payments = await Payment.paginate(
			{ InvoiceNumber: { $regex: text ? text : "", $options: "i" } },

			{ ...pageOptions, page, offset: page * 5, sort: "-updated_at" }
		);
		return res.status(200).json({ success: true, data: payments });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = withSentry(connectDB(withProtect(userHandler)));
