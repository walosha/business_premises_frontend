import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Payment from "lib/models/Payment";

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			// Update or create data in your database
			getAllPaymentsCount(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function getAllPaymentsCount(_, res) {
	try {
		let PaymentsCount = await Payment.aggregate([
			{
				$group: {
					_id: "",
					totalAmount: { $sum: "$AmountPaid" },
				},
			},
			{
				$project: {
					_id: 0,
				},
			},
		]);
		return res.status(200).json({ success: true, data: PaymentsCount });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = connectDB(withProtect(userHandler));
