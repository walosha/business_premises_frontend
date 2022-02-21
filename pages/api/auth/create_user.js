const bcrypt = require("bcrypt");
const { default: withProtect } = require("lib/middlewares/withProtect");
const { default: withRoles } = require("lib/Hoc/withRoles");
const { withSentry } = require("@sentry/nextjs");
const connectDB = require("lib/mongodb");
const User = require("lib/models/users");

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
		return res
			.status(422)
			.send({ success: "false", message: "data_incomplete" });
	}
}

module.exports = connectDB(withProtect(withRoles(userHandler, "admin")));
