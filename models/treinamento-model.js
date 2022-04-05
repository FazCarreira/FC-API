const mongoose = require('mongoose');
const { roles } = require('../constants')

const TreinamentoSchema = new mongoose.Schema({
    nome: String,
    etapas: [{
        nome: String,
        link_aula: String,
        hora_inicial: Date,
        hora_final: Date,
        dia: Date,
        facilitador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'file',
        },
        participantes: [],
        materiais: [{
            nome: String,
            link: String,
            icon: Number
        }],
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

const Treinamento = mongoose.model('treinamento', TreinamentoSchema);
module.exports = Treinamento;