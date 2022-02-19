const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const mongoosePaginate = require("mongoose-paginate-v2");

const Scheme = mongoose.Schema;

const businesScheme = new Scheme(
  {
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Business must belong to a User!"],
    },
    reg_no: {
      type: String,
      unique: true,
      required: true,
      min: [6, "Few registration number"],
    },
    owner_name: {
      type: String,
      required: true,
    },
    StateTIN: {
      type: String,
    },
    NormalizedStateTIN: {
      type: String,
    },
    api: {
      type: Object,
      required: false, //depends on whether the field is mandatory or not
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    employee_no: {
      type: String,
    },
    lga: {
      type: String,
    },
    business_type: {
      type: String,
    },
    business_structure: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.business_id = ("0000000000" + ret.business_id).slice(-10);
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

businesScheme.plugin(mongoosePaginate);

if (!mongoose.models.Business) {
  businesScheme.plugin(AutoIncrement, { inc_field: "business_id" });
}

businesScheme.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "user",
    select: "name",
  });
  next();
});

global.Business = global.Business || mongoose.model("Business", businesScheme);
module.exports = global.Business;
