import connectDB from "lib/mongodb";
import withProtect from "lib/middlewares/withProtect";
import User from "lib/models/users";
import { pageOptions } from "lib/models/paginate";
import { withSentry } from "@sentry/nextjs";

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			// Update or create data in your database
			getAllUsers(req, res);
			break;
		case "PATCH":
			// Update or create data in your database
			getAllUsers(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function getAllUsers(req, res) {
	const { id, page = 1 } = req.query;

	try {
		if (id) {
			let user = await User.findById(id).populate();
			return res
				.status(200)
				.json({ success: true, data: user })
				.select("-password");
		}

		let users = await User.paginate(
			{},
			{ ...pageOptions, offset: page * 50, page, sort: "-updated_at" }
		);
		return res.status(200).json({ success: true, data: users });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = withSentry(connectDB(withProtect(userHandler)));
