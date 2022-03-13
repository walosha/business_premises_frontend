import { withSentry } from "@sentry/nextjs";
import withProtect from "lib/middlewares/withProtect";
import connectDB from "lib/mongodb";

async function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			// Update or create data in your database
			getMe(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function getMe(req, res) {
	try {
		delete req.user.password;
		return res.status(200).json({ success: true, data: req.user });
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

module.exports = connectDB(withSentry(withProtect(userHandler)));
