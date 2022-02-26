const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { index } = require("./controller");

/* GET home page. */
router.get("/books", auth, index);

module.exports = router;
