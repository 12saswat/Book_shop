const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Books = require("../books.json");

router.get("/homePage", (req, res) => {
  fs.readFile("./books.json", "utf8", (err, jsonData) => {
    const data = JSON.parse(jsonData);
    res.render("homePage", { data });
  });
});

router.get("/create", (req, res) => {
  res.render("Uplode");
});

router.get("/details/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Get the title from the route parameter
  fs.readFile("./books.json", "utf8", (err, jsonData) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }
    const books = JSON.parse(jsonData);
    const book = books.find((b) => b.id === id); // Find the book by title

    if (book) {
      res.render("details", { book }); // Pass the found book to the details view
    } else {
      res.status(404).send("Book not found");
    }
  });
});

// Route to add a book to cart
router.post("/addToCart/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10); // Ensure ID is an integer
  const book = Books.find((b) => b.id === bookId); // Find the book from Books object

  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Check if the book is already in the cart
  const existingBook = req.session.cart.find((item) => item.id === bookId);

  if (existingBook) {
    existingBook.quantity += 1; // Increase the quantity if already in the cart
  } else {
    req.session.cart.push({ ...book, quantity: 1 }); // Add new book to cart
  }

  res.redirect("/books/cart"); // Redirect to the cart page after adding
});

router.post("/removeFromCart/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter((item) => item.id !== bookId);
  }

  res.redirect("/books/cart");
});
// Route to display cart
router.get("/cart", (req, res) => {
  const cartItems = req.session.cart || [];
  res.render("cartPage", { cartItems });
});

module.exports = router;
