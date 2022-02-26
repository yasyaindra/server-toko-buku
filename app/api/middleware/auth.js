const User = require("../../../db/models/user");
const jwt = require("jsonwebtoken");
const config = require("../../../config");

// Middleware Sign In 13:06
module.exports = {
  auth: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;
      const decoded = jwt.verify(token, config.jwtKey);
      if (decoded) {
        req.user = decoded.user;
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  },
};
