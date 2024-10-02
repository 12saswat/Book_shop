const express = require("express");
const router = express.Router();

router.get("/HomePage", (req, res) => {
  res.render("index");
});

module.exports = router;
