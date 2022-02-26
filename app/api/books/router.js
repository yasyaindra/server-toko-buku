const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { index, actionCreate } = require("./controller");

/* GET home page. */
router.get("/books", auth, index);
router.post("/books", auth, actionCreate);

module.exports = router;
