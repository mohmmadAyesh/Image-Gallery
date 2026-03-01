const express = require("express");
const multer = require("multer");
const FILESIZE = 1000 * 1000 * 5;
const CustomError = require("../services/error-handler/CustomError");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file object", file);
    console.log("request object", req);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploads = multer({
  storage: storage,
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

router.post(
  "/upload",
  uploads.single("file"),
  (req, res, next) => {
    if (!req.file) {
      throw new CustomError("FILE_NOT_PROVIDED", 400);
    }
    if (req.file.size > FILESIZE) {
      throw new CustomError("File too large", 400);
    }
    // read first 8 byte of the file after reading it in sync
    const header = require("fs").readFileSync(req.file.path, "hex").slice(0, 8);
    // here we specified we want encoding as hex because we want to read the bytes within
    // the buffer in hex format to determine the file type by looking into the first byte that represent the header
    let type = "unknown";
    switch (header) {
      case "89504e47":
        type = "image/png";
        break;
      case "47494638":
        type = "image/gif";
        break;
      case "ffd8ffe0":
      case "ffd8ffe1":
      case "ffd8ffe2":
        type = "image/jpeg";
        break;
      default:
        throw new CustomError("INVALID_MIME_TYPE", 400);
    }
    next();
  },
  PostgresSQL,
  uploadImage,
);
router.get("/images", PostgresSQL, getAllImages);
router.delete("/delete", PostgresSQL, deleteImage);
module.exports = router;
