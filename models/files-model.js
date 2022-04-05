const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    key: String,
    src: String,
    created: {
        type: Date,
        default: Date.now
    }
});

//Lembra de que o nome do db tem que ser em minusculo.
const File = mongoose.model('file', FileSchema);
module.exports = File;