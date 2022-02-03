const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheme = mongoose.Schema;

const mdaScheme = new Scheme(
  {
    mda_id: { type: String },
    title: { type: String },
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [false, "MDA must be created by a User!"],
    },
    slug: { type: String },
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

if (!mongoose.models.Mda) {
  mdaScheme.plugin(AutoIncrement, { inc_field: "reg_number" });
}

mdaScheme.pre(/^find/, function (next) {
  this.populate("created_by").populate({
    path: "created_by",
    select: "name",
  });
  next();
});

global.Mda = global.Mda || mongoose.model("Mda", mdaScheme);
module.exports = global.Mda;
