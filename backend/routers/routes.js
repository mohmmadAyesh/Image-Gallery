const express = require('express');
const multer = require('multer');
const FILESIZE= 1000 * 1000 * 5;
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'uploads');
    },
    filename: function (req,file,cb){
        cb(null, file.originalname);
    }
});
const uploads = multer({storage: storage, limits: {fileSize: FILESIZE}});
const router = express.Router();
const { PostgresSQL } = require('../db/db');
const { uploadImage, getAllImages } = require('../controllers/imageController');

router.post('/upload',uploads.single('file'), PostgresSQL, uploadImage);
router.get('/images', PostgresSQL, getAllImages);

module.exports = router;