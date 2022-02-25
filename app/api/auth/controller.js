const { User } = require("../../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email } });
      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);
        if (checkPassword) {
          res.status(200).json({ message: "Sukses Sign In!" });
        } else {
          res.status(403).json({ message: "Invalid Password" });
        }
      } else {
        res.status(403).json({ message: "Email Not Found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
