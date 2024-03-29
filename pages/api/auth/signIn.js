import User from "lib/models/users";
import connectDB from "lib/mongodb";
import { signToken } from "utils/generateToken";
import bcrypt from "bcrypt";
import { withSentry } from "@sentry/nextjs";

// User.create({
// 	name: "olawale Afuye",
// 	email: "walosha@yahoo.com",
// 	password: "$2a$06$hAYG5TwJcL/duevZDPOGheM1idLViNLQUIFSTaAe9S8TiOPXMfEhW", //Olajuwon1?
// })
// 	.then((item) => {
// 		console.log(`${item.length} items created`);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	})
// 	.finally(() => {
// 		// mongoose.connection.close();
// 	});

function userHandler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			// Update or create data in your database
			signIn(req, res);
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function signIn(req, res) {
	const { email, password } = req.body;
	if (email && password) {
		try {
			// Hash password to store it in DB
			const user = await User.findOne({ email }).select("+password");

			if (!user) {
				return res.status(401).json({ message: "User or password incorrect!" });
			}
			var isPasswordSame = await bcrypt.compareSync(password, user.password);

			if (!isPasswordSame) {
				return res
					.status(401)
					.json({ message: "Email or password incorrect!" });
			}

			const token = signToken({ id: user._id, role: user.role });
			delete user.password;
			// Sign IN user
			return res.status(200).send({
				status: "success",
				token,
				data: {
					user,
				},
			});
		} catch (error) {
			return res.status(500).send(error.message);
		}
	} else {
		return res
			.status(400)
			.json({ message: "Please provide email and password!" });
	}
}

module.exports = withSentry(connectDB(userHandler));
