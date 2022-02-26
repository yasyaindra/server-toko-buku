const { Category } = require("../../../db/models");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const jwt = require("jsonwebtoken");

module.exports = {
  index: async (req, res, next) => {
    try {
      const categories = await Category.findAll();
      res.status(201).json({
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      const payload = req.body;
      const categories = await Category.create(payload);
      res.status(201).json({
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  actionUpdate: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const checkedCategory = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
      });

      const categories = await checkedCategory.update({ name: name });
      res.status(201).json({
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  actionDelete: (req, res, next) => {
    console.log(req.params.id);
    console.log(req.user.id);
    Category.findOne({ where: { id: req.params.id, user: req.user.id } })
      .then((category) => {
        category.destroy();
        res.status(201).json({
          message: `${category.name} is deleted successfully`,
          data: category,
        });
      })
      .catch((error) => next(error));
  },
};
