const User = require("lib/models/users");
const bcrypt = require("bcrypt");
const connectDB = require("lib/mongodb");
const { withSentry } = require("@sentry/nextjs");

function userHandler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST":
			signUp(req, res);
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function signUp(req, res) {
	const { name, email, password } = req.body;
	if (name && email && password) {
		try {
			// Hash password to store it in DB
			var passwordhash = await bcrypt.hash(password, 6);
			var user = new User({
				name,
				email,
				password: passwordhash,
				role: "user",
			});
			// Create new user
			var usercreated = await user.save();
			delete usercreated.password;
			return res.status(200).send(usercreated);
		} catch (error) {
			if (error.name === "MongoServerError" && error.code === 11000) {
				return res
					.status(422)
					.send({ success: "false", message: "Email already exist !" });
			}
			return res.status(500).send(error.message);
		}
	} else {
		res.status(422).send({ success: "false", message: "data_incomplete" });
	}
}

module.exports = withSentry(connectDB(userHandler));
