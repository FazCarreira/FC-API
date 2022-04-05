const mongoose = require('mongoose');

const ParceiroSchema = new mongoose.Schema({
    ramo: String,
    tipo: String,
    dt_nascimento: String,
    camisa: String,
    endereco: {
        cep: String,
        estado: String,
        cidade: String,
        bairro: String,
        rua: String,
        numero: String,
        complemento: String,
    },
    cpf: String,
    cnpj: String,
    ci: String,
    inscricao_municipal: String,
    inscricao_estadual: String,
    contribuinte: String,
    estado_civil: String,
    nome_contato: String,
    dependentes: String,
    info_bancaria: {
        tipo: String,
        banco: String,
        agencia: String,
        conta: String,
        pix: String,
        other: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Parceiro = mongoose.model('parceiro', ParceiroSchema);

module.exports = Parceiro;