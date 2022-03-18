import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import Business from "lib/models/Businesses";
require("lib/models/Invoice");
require("lib/models/Payment");

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			// Update or create data in your database
			getAllBusinessesCount(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

//Aggregation from stackoverflow https://stackoverflow.com/questions/62784733/get-count-of-documents-created-in-every-month-mongoose-node-js
async function getAllBusinessesCount(_, res) {
	try {
		let BusinessRegisteredByMth = await Business.aggregate([
			// User is the model of userSchema
			{
				$group: {
					_id: { $month: "$created_at" }, // group by the month *number*, mongodb doesn't have a way to format date as month names
					numberofdocuments: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: false, // remove _id
					month: {
						// set the field month as the month name representing the month number
						$arrayElemAt: [
							[
								"", // month number starts at 1, so the 0th element can be anything
								"january",
								"february",
								"march",
								"april",
								"may",
								"june",
								"july",
								"august",
								"september",
								"october",
								"november",
								"december",
							],
							"$_id",
						],
					},
					numberofdocuments: true, // keep the count
				},
			},
		]);
		return res
			.status(200)
			.json({ success: true, data: BusinessRegisteredByMth });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = connectDB(withProtect(userHandler));
