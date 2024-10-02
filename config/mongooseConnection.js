const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/BookShop").then(() => {
  console.log("> mongoDb coonected successfully");
});

module.exports = mongoose.connection;
