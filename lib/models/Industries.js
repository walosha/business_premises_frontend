const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const industryScheme = new Scheme({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

global.Industry = global.Industry || mongoose.model("Industry", industryScheme);

module.exports = global.Industry;
