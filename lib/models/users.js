const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const userScheme = new Scheme({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  since: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
});

global.User = global.User || mongoose.model("User", userScheme);

module.exports = global.User;
