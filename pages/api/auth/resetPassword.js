const crypto = require("crypto");
const User = require("lib/models/users");
const connectDB = require("lib/mongodb");
const bcrypt = require("bcrypt");
const { withSentry } = require("@sentry/nextjs");

function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			forgetPassword(req, res);
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function forgetPassword(req, res) {
	const { password } = req.body;
	const token = req.query.token;
	console.log({ password });
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

	try {
		const user = await User.findOne({
			passwordResetToken: hashedToken,
		});
		user.password = await bcrypt.hash(password, 6);
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();
		res.status(200).json({
			status: "success",
			message: "Password sucessfully reset!",
		});
	} catch (err) {
		res.status(500).send({
			success: "false",
			message: err,
		});
	}
}

module.exports = withSentry(connectDB(userHandler));
