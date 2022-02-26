const jwt = require("jsonwebtoken");
const config = require("../../../config");

// Middleware Sign In 13:06
module.exports = {
  auth: (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer :", "")
        : null;

      if (token) {
        req.user = token.user;
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  },
};
