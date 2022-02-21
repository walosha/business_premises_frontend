const crypto = require("crypto");
const User = require("lib/models/users");
const connectDB = require("lib/mongodb");

function validateTokenHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "GET":
			validateResetToken(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function validateResetToken(req, res) {
	const token = req.query.token;
	// 1) Get user based on the token
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: new Date().toString() },
	});
	console.log({ user });
	if (!user)
		return res.status(401).json({
			status: "failure",
			message: "Token is invalid or has expired",
		});

	return res.status(200).json({
		status: "Success",
		message: "Token is valid!",
	});
}

module.exports = connectDB(validateTokenHandler);
