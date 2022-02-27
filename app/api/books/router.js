const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  index,
  actionCreate,
  actionUpdate,
  actionDelete,
} = require("./controller");

/* GET home page. */
router.get("/books", auth, index);
router.post("/books", auth, actionCreate);
router.put("/books/:id", auth, actionUpdate);
router.delete("/books/:id", auth, actionDelete);

module.exports = router;
