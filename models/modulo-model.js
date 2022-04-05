const mongoose = require('mongoose');
const { roles } = require('../constants')

const ModuloSchema = new mongoose.Schema({
    nome: String,
    facilitador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    link_aula: String,
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file',
    },
    aulas: [{
        nome: String,
        hora_inicial: Date,
        hora_final: Date,
        dia: Date,
        frequencia: [],
        materiais: [{
            nome: String,
            link: String,
            icon: Number
        }],
    }],
    materiais: [{
        nome: String,
        link: String,
        icon: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    }],
    ementa: String,
    avaliacao: {
        partes: [{
            tema: String,
            tempo: String,
            atividades: String
        }],
        observacao_geral: String,
        destaques: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            observacao: String,
            hab_per: [String],
        }],
        atencao_especial: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            observacao: String,
        }],
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Modulo = mongoose.model('modulo', ModuloSchema);
module.exports = Modulo;