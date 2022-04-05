const mongoose = require('mongoose');

const CurriculoSchema = new mongoose.Schema({
    resumo: String,
    objetivo: String,
    formacao: [{
        tipo: String,
        nome: String,
        instituicao: String,
        conclusao: String
    }],
    office: {
        word: String,
        exel: String,
        power_point: String,
    },
    capacitacao: {
        nome: String,
        instituicao: String,
        cargahoraria: String,
        conclusao: String
    },
    profissional: [{
        empresa: String,
        desc: String,
        entrou: String,
        saiu: String,
    }],
    voluntario: {
        empresa: String,
        desc: String,
        entrou: String,
        saiu: String,
    },
    idiomas: {
        idioma: String,
        nivel: String
    },
    cursos: [{
        nome: String,
        instituicao: String,
        inicio: Date,
        fim: Date,
        ch: String,
    }],
    hobbies: [String],
    apoio: [String],
    skills: [String],
    created: {
        type: Date,
        default: Date.now
    }
});

const Curriculo = mongoose.model('curriculo', CurriculoSchema);

module.exports = Curriculo;