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
router.get("/categories", auth, index);
router.post("/categories", auth, actionCreate);
router.put("/categories/:id", auth, actionUpdate);
router.delete("/categories/:id", auth, actionDelete);

module.exports = router;
