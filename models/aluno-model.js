const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    curso: {
        turma: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'turma',
        },
        opiniao: {
            curso: {
                recomendacao: String,
                duracao: String,
                preferencia: String,
                dia_semana: String,
                periodo_dia: String,
                temas: String,
                impacto: String,
            },
            modulos: [{
                recomendacao: String,
                duracao: String,
                clareza: String,
                aplicabilidade: String,
                clareza: String,
                participacao: String,
                inovacao: String,
                aproveitamento: String,
                objetivos: String,
                qualidade: String,
                depoimento: String,
                criativa: String,
                expectativas: String,
                gostou: String,
                melhorado: String,
            }]
        }
    },
    turma: String,
    dt_nascimento: String,
    instagram: String,
    endereco: {
        cep: String,
        estado: String,
        cidade: String,
        bairro: String,
        rua: String,
        numero: String,
        complemento: String,
    },
    apps: [String],
    instituicao: String,
    estado_civil: String,
    cpf: String,
    rg: String,
    genero: String,
    identificacao_racial: String,
    quem_mora: String,
    qtd_mora: String,
    filhos: Boolean,
    qtd_filhos: String,
    renda_familiar: String,
    baixa_renda: Boolean,
    escola_publica: Boolean,
    escolaridade: String,
    acesso_internet: String,
    possui_computador: Boolean,
    conflitos: String,
    raiva: String,
    importante: String,
    futuro: String,
    profissao: String,
    decisao: String,
    preparado: String,
    cursos: String,
    curriculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'curriculo',
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Aluno = mongoose.model('aluno', AlunoSchema);

module.exports = Aluno;

// basico: {
//     cep,
//     estado,
//     cidade,
//     bairro,
//     rua,
//     number,
//     complemento,
// }