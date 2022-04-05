const express = require('express');
const router = express.Router();
const { uploadImg, uploadVid } = require('../middlewares/multer');
const { fileUpload } = require('../controllers/file-ctrl');
const { auth } = require('../middlewares/auth');

router.post(
    '/image',
    auth, uploadImg.single('uploadedFile')
    ,
    fileUpload
);

router.post(
    '/video',
    [auth, uploadVid.single('uploadedFile')]
    ,
    fileUpload
);

module.exports = router;