const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { index, detailTransaction } = require("./controller");

/* GET home page. */
router.get("/transactions", auth, index);
router.get("/transactions/:id", auth, detailTransaction);

module.exports = router;
