const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    nome: String,
    link: String,
    icon: Number,
});

//Lembra de que o nome do db tem que ser em minusculo.
const Material = mongoose.model('material', MaterialSchema);
module.exports = Material;