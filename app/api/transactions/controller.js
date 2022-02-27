const { Transaction, DetailTransaction } = require("../../../db/models");
const { Op } = require("sequelize");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { invoice = "" } = req.query;

      let condition = {
        user: req.user.id,
      };

      if (invoice !== "") {
        condition = { ...condition, invoice: invoice };
      }

      const transactions = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,
          as: "detailTransaction",
        },
      });

      res
        .status(200)
        .json({ message: "Success get all books", data: transactions });
    } catch (error) {
      next(error);
    }
  },
  detailTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;
      const detailTransaction = await Transaction.findOne({
        where: { id: id },
        include: { model: DetailTransaction, as: "detailTransaction" },
      });

      res.status(200).json({
        message: "Success get all detail transaction",
        data: detailTransaction,
      });
    } catch (error) {
      next(error);
    }
  },
};
