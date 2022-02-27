const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkout } = require("./controller");

/* GET home page. */
router.post("/checkout", auth, checkout);

module.exports = router;
