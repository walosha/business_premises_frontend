const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const paymentScheme = new Scheme(
  {
    title: { type: String },
    mda_id: String,
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [false, "MDA must be creaed by a User!"],
    },
    amount: { type: Number },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

global.Payment = global.Payment || mongoose.model("Payment", paymentScheme);
module.exports = global.Payment;
