const User = require("lib/models/users");
const Email = require("utils/email");
const connectDB = require("lib/mongodb");

function forgetPasswordHandler(req, res) {
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
	const { email } = req.body;
	// 1) Get user based on POSTed email
	const user = await User.findOne({ email });
	if (!user) {
		res
			.status(422)
			.send({ success: "false", message: "no user with this email" });
	}

	// 2) Generate the random reset token
	const resetToken = user.createPasswordResetToken();

	// 3) Send it to user's email
	try {
		await user.save({ validateBeforeSave: false });
		const resetURL = `${process.env.BASE_URL}/resetPassword/${resetToken}`;
		await new Email(user, resetURL).sendPasswordReset();

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (err) {
		console.log({ err });
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		res.status(500).send({
			success: "false",
			message: "There was an error sending the email. Try again later!",
		});
	}
}

module.exports = connectDB(forgetPasswordHandler);
