const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const countryScheme = new Scheme({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
  },
});

global.Country = global.Country || mongoose.model("Country", countryScheme);

module.exports = global.Country;
