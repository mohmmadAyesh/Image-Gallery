const express = require("express");
const multer = require("multer");
const FILESIZE = 1000 * 1000 * 5;
const CustomError = require("../services/error-handler/CustomError");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploads = multer({
  storage: storage,
  limits: { fileSize: FILESIZE },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new CustomError("FILE_TYPE_NOT_ALLOWED", 400));
    }
  },
});
const router = express.Router();
const { PostgresSQL } = require("../db/db");
const {
  uploadImage,
  getAllImages,
  deleteImage,
} = require("../controllers/imageController");

router.post("/upload", uploads.single("file"), PostgresSQL, uploadImage);
router.get("/images", PostgresSQL, getAllImages);
router.delete("/delete", PostgresSQL, deleteImage);
module.exports = router;
