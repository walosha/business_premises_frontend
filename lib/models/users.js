const crypto = require("crypto");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
      index: true,
    },
    password: {
      type: String,
      required: true,
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

userScheme.plugin(mongoosePaginate);

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
