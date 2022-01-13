const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const paymentScheme = new Scheme(
  {
    title: { type: String },
    mda_id: String,
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [false, "MDA must be created by a User!"],
    },
    invoice_no: {
      type: Number,
      ref: "Invoice",
      required: [false, "Payment must be associated with an invoice"],
    },
    amount: { type: Number },
    channel: { type: String },
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

paymentScheme.pre(/^find/, function (next) {
  this.populate({
    path: "created_by",
    select: "name",
  });
  this.populate({
    path: "invoice_no",
    select: "invoice_no",
  });
  next();
});

global.Payment = global.Payment || mongoose.model("Payment", paymentScheme);
module.exports = global.Payment;
