const express = require("express");
const router = express.Router();
const { signin } = require("./controller");
/* GET home page. */
router.post("/auth/signin", signin);

module.exports = router;
