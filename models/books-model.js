const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("Book", BookSchema);
