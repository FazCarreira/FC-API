const multer = require('multer');
const path = require("path");
const Aws = require('aws-sdk');

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    },
})

const imgFilter = (req, file, callback) => {
    let pattern = /jpg|png|jpeg/; // reqex

    if (pattern.test(path.extname(file.originalname))) callback(null, true);
    else callback('Somente são aceitos arquivos .jpg .png');
};

const vidFilter = (req, file, callback) => {
    let pattern = /mp4|ogg|mpeg|wmv/; // reqex

    if (pattern.test(path.extname(file.originalname))) callback(null, true);
    else callback('Somente são aceitos arquivos .mp4 .ogg .mpeg .wmv');
};

const uploadImg = multer({ storage, fileFilter: imgFilter });
const uploadVid = multer({ storage, fileFilter: vidFilter });

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
})

function uploadFile(file) {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ACL: "public-read-write",
        ContentType: file.mimetype
    };
    return s3.upload(uploadParams).promise();
}

module.exports = { uploadVid, uploadImg, uploadFile };