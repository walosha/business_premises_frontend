const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const businesScheme = new Scheme({
  name: {
    type: String,
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
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

global.Business = global.Business || mongoose.model("Business", businesScheme);

module.exports = global.Business;
