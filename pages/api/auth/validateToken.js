const User = require("lib/models/users");
const connectDB = require("lib/mongodb");

function userHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      validateResetToken(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function validateResetToken(req, res, next) {
  console.log({ next });
  validateToken(req.params.token, res);
}

async function validateToken(token, res) {
  const account = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!account)
    res.status(200).json({
      status: "success",
      message: "Token is Valid!",
    });
  return res.status(401).json({
    status: "failure",
    message: "Token is invalid or expired!",
  });
}

module.exports = connectDB(userHandler);
