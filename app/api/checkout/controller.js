const { Transaction, DetailTransaction, Book } = require("../../../db/models");
const { Op } = require("sequelize");
const sequelize = require("../../../db/models").sequelize;

module.exports = {
  checkout: async (req, res, next) => {
    const isTransaction = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.id;

      const transaction = await Transaction.create(
        {
          invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date(),
          name: req.user.name,
          user: user,
        },
        { transaction: isTransaction }
      );

      let errorBookNotFound = [],
        errorBookIdStock = [],
        updateStock = [];

      for (let i = 0; i < payload.length; i++) {
        const checkedBook = await Book.findOne({
          where: { id: payload[i].bookId, user: user },
        });

        // add field create detail transaction
        payload[i].transaction = transaction.id;
        payload[i].titleBook = checkedBook?.title ?? "";
        payload[i].book = checkedBook.id;
        payload[i].imageBook = checkedBook?.image ?? "";
        payload[i].price = checkedBook?.price ?? "";
        payload[i].user = user;

        updateStock.push({
          id: payload[i].bookId,
          stock: checkedBook?.stock - payload[i]?.quantity,
          user: user,
        });

        if (payload[i]?.quantity > checkedBook?.stock) {
          errorBookIdStock.push(
            `${payload[i]?.quantity} - ${checkedBook.stock}`
          );
        }

        if (!checkedBook) {
          errorBookNotFound.push(payload[i].bookId);
        }
      }

      if (errorBookIdStock.length !== 0) {
        return res.status(400).json({
          message: `book is not enough with id ${errorBookIdStock.join(
            ", "
          )} and user : ${user}`,
        });
      }

      if (errorBookNotFound.length !== 0) {
        return res.status(400).json({
          message: `no book with id : ${errorBookNotFound.join(
            ", "
          )} and user: ${user}`,
        });
      }

      await Book.bulkCreate(
        updateStock,
        {
          updateOnDuplicate: ["stock"],
        },
        { transaction: isTransaction }
      );

      const detailTransaction = await DetailTransaction.bulkCreate(payload, {
        transaction: isTransaction,
      });

      await isTransaction.commit();

      res
        .status(201)
        .json({ message: "successfully checkout!", data: detailTransaction });
    } catch (error) {
      if (isTransaction) await isTransaction.rollback();
      next(error);
    }
  },
};
