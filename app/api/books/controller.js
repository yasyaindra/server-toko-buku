const { Book } = require("../../../db/models");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const jwt = require("jsonwebtoken");

module.exports = {
  index: async (req, res, next) => {
    try {
      const books = await Book.findAll();
      res.status(201).json({
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      const payload = req.body;

      const books = await Book.create(payload);

      res.status(201).json({
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
};
