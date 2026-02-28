const express = require('express');
const router = express.Router();
const { PostgresSQL } = require('../db/db');
const { uploadImage, getAllImages } = require('../controllers/imageController');

router.post('/upload', PostgresSQL, uploadImage);
router.get('/images', PostgresSQL, getAllImages);

module.exports = router;