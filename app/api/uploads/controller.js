const Book = require("../../../db/models/book");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(403).json({ message: "No Image Found" });
    }

    res.status(201).json({
      message: "Success upload image",
      data: { src: `/uploads/${req.file.filename}` },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage };
