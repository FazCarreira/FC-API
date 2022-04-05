const mongoose = require('mongoose');
const { roles } = require('../constants')

const TurmaSchema = new mongoose.Schema({
    numero: Number,
    forum: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            text: {
                type: String,
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    modulos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'modulo',
    }],
    apoiadores: [String],
    instituicao: [String],
    matriculas: {
        inicio: Date,
        fim: Date,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Turma = mongoose.model('turma', TurmaSchema);
module.exports = Turma;