const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const invoiceScheme = new Scheme(
  {
    mda_id: String,
    tax_item_id: String,
    business_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Business",
      required: [false, "Invoice must be associated with a business!"],
    },
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [false, "MDA must be created by a User!"],
    },
    description: { type: String },
    amount: { type: Number },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        // ret.business_id = ("0000000000" + ret.business_id).slice(-10);
      },
    },
  }
);

invoiceScheme.pre(/^find/, function (next) {
  this.populate({
    path: "created_by",
    select: "name",
  });
  this.populate({
    path: "business_id",
    select: "name address lga state business_id",
  });
  next();
});

global.Invoice = global.Invoice || mongoose.model("Invoice", invoiceScheme);
module.exports = global.Invoice;
