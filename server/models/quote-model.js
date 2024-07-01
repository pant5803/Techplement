const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});

const Quote = new mongoose.model("Quote", quoteSchema);

module.exports = Quote;
