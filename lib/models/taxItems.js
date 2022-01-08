const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const taxItemScheme = new Scheme(
  {
    title: { type: String },
    mda_id: String,
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [false, "MDA must be creaed by a User!"],
    },
    slug: { type: String },
    rules: { type: JSON },
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

taxItemScheme.pre(/^find/, function (next) {
  this.populate("created_by").populate({
    path: "created_by",
    select: "name",
  });
  next();
});

global.TaxItem = global.TaxItem || mongoose.model("TaxItem", taxItemScheme);
module.exports = global.TaxItem;
