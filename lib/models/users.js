const crypto = require("crypto");
const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const userScheme = new Scheme(
  {
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
      enum: ["user", "admin", "superAdmin"],
      default: "user",
      required: true,
    },
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userScheme.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

global.User = global.User || mongoose.model("User", userScheme);

module.exports = global.User;
