const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    apoiadores: [{
        name: String,
        link: String,
        file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'file',
        }
    }],
    parceiros: [{
        name: String,
        link: String,
        file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'file',
        }
    }],
    opinioes: [{
        nome: String,
        desc: String,
        file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'file',
        }
    }],
    about: {
        video: String,
        video2: String,
        time: [{
            nome: String,
            desc: String,
            src: String,
            link: String,
        }],
        text1: String,
        text2: String,
        bginfo: String,
        feitos: {
            jovens: String,
            turmas: String,
            estados: String,
            empresas: String,
            insercoes: String,
            impactados: String,
        }
    },
    trilhas: [{
        animacao: String,
        name: String,
        chamada: String,
        desc: String,
        inicio: Date,
        fim: Date,
        inscricoes: Date,
        investimento: String,
        horas: String,
        facilitadores: [{
            img: String,
            name: String,
            desc: String,
            link: String
        }],
        modulos: [{
            name: String,
            desc: String,
            about: String
        }]
    }],
    video: String,
    contato: {
        local: String,
        email: String,
        telefone: [String]
    }
});

const Site = mongoose.model('site', SiteSchema);
module.exports = Site;