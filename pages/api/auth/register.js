const User = require("lib/models/users");
const bcrypt = require("bcrypt");
const connectDB = require("lib/mongodb");

function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      // Update or create data in your database
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
      });
      // Create new user
      var usercreated = await user.save();
      return res.status(200).send(usercreated);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send("data_incomplete");
  }
}

export default connectDB(userHandler);
