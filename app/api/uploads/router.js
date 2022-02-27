const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { uploadImage } = require("./controller");
const uploadMiddleware = require("../middleware/multer");

/* GET home page. */
router.post("/uploads", auth, uploadMiddleware.single("image"), uploadImage);

module.exports = router;
