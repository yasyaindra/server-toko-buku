const { User } = require("../../../db/models");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email } });
      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);
        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            config.jwtKey
          );
          res
            .status(200)
            .json({ message: "Successfully Signed In", data: { token } });
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
