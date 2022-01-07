import User from "lib/models/users";
import connectDB from "lib/mongodb";
import { signToken } from "utils/generateToken";
import cookie from "cookie";
const bcrypt = require("bcrypt");

// Country.create(countries)
//   .then((user) => {
//     console.log(`${user.length} users created`);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     // mongoose.connection.close();
//   });

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

      const token = signToken(user._id);
      // res.cookie("token", token, {
      //   expires: new Date(
      //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      //   ),
      //   httpOnly: true,
      //   secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      // });

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

module.exports = connectDB(userHandler);
