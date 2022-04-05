const File = require('../models/files-model');
const { uploadFile } = require('../middlewares/multer');

const fileUpload = async (req, res) => {
    try {
        const data = await uploadFile(req.file);
        const file = new File({
            key: data.Key,
            src: data.Location
        })
        await file.save();
        res.json(file).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    fileUpload
}