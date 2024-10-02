const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/mongooseConnection");
const booksRouter = require("./routes/booksRouter");
const session = require("express-session");

const port = process.env.PORT || 5000;

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/books", booksRouter);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
