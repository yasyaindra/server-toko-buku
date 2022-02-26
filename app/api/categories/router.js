const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

/* GET home page. */
router.get("/categories", auth, function (req, res) {
  res.status(200).json({ message: "Category Connected!" });
});

module.exports = router;
