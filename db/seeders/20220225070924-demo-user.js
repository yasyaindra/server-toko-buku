"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync("rahasia", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Yasya Indra",
          email: "admin@gmail.com",
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      // BWA Seeder. 6:48
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
