const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/categories", function (req, res) {
  res.status(200).json({ message: "Category Connected!" });
});

module.exports = router;
