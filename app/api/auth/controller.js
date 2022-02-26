const { User } = require("../../../db/models");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(User);
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
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { name, password, confirmedPassword, email } = req.body;

      if (password !== confirmedPassword) {
        res.status(403).json({ message: "Password doesn't match" });
      }

      const checkedEmail = await User.findOne({ where: { email: email } });

      if (checkedEmail) {
        return res.status(403).json({ message: "Email Has Been Registered" });
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: "admin",
      });
      delete user.password;

      res.status(201).json({
        message: "Success Sign Up",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
