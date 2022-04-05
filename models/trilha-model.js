const mongoose = require('mongoose');
const Turma = require('./turma-model');

const TrilhaSchema = new mongoose.Schema({
    nome: String,
    desc: String,
    ementa: String,
    modulos: [String],
    turmas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'turma',
    }],
    created: {
        type: Date,
        default: Date.now
    },
    // materiais: [{
    //     nome: String,
    //     link: String,
    //     icon: Number,
    // }],
});

// TrilhaSchema.post("remove", async function (res, next) {
//     await Turma.deleteOne({ _id: this.turmas });
//     next();
// });

const Trilha = mongoose.model('trilha', TrilhaSchema);
module.exports = Trilha;