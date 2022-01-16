const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Scheme = mongoose.Schema;

const paymentScheme = new Scheme(
  {
    invoice_no: {
      type: Number,
      ref: "Invoice",
      required: [false, "Payment must be associated with an Invoice!"],
    },
    invoice_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Invoice",
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
  },
  {
    toObject: { Virtual: true },
    toJSON: { virtuals: true },
  }
);

paymentScheme.plugin(mongoosePaginate);

paymentScheme.pre(/^find/, function (next) {
  this.populate({
    path: "invoice_id",
    select: "mda_id tax_item_id description status",
  });
  next();
});

global.Payment = global.Payment || mongoose.model("Payment", paymentScheme);
module.exports = global.Payment;
