const { Book, Category } = require("../../../db/models");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { keyword = "", category = "" } = req.query;

      let condition = {
        user: req.user.id,
      };

      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }

      if (category !== "") {
        condition = { ...condition, category: category };
      }
      console.log("====condition====");
      console.log(condition);

      const books = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ["id", "name"],
        },
      });

      res.status(200).json({ message: "Success get all books", data: books });
    } catch (error) {
      next(error);
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      let user = req.user.id;
      const payload = req.body;

      const checkedCategory = await Category.findOne({
        where: { id: payload.category, user: user },
      });

      if (!checkedCategory) {
        return res.status(404).json({ message: "id category not found" });
      }

      const books = await Book.create(payload);

      res.status(201).json({
        message: "Success create book",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
  actionUpdate: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { id } = req.params;
      const payload = req.body;

      console.log("=======================");
      console.log(id);
      console.log("=======================");

      const checkedCategory = await Category.findOne({
        where: { id: payload.category, user: user },
      });

      if (!checkedCategory) {
        return res.status(404).json({ message: "id category not found" });
      }

      const checkedBook = await Book.findOne({ where: { id: id } });

      if (!checkedBook) {
        return res.status(404).json({ message: "id book not found" });
      }

      const books = await checkedBook.update(payload);

      res.status(201).json({
        message: "Success create book",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
  actionDelete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const books = await Book.findOne({ where: { id: id } });

      if (!books) {
        return res.status(404).json({ messsage: "id is not found" });
      }

      books.destroy();
      res.status(200).json({
        message: "Data is successfully deleted",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
};
