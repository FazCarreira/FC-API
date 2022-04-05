const User = require('../models/user-model');
const Parceiro = require('../models/parceiro-model');
const Aluno = require('../models/aluno-model');
const Curriculo = require('../models/curriculo-model');

const Turma = require('../models/turma-model');
const { aluno } = require('../constants');

const createProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        switch (user.profile_type) {
            case 'aluno':
                const aluno = new Aluno(req.body);
                const turma = await Turma.findOne({ instituicao: { $all: [req.body.instituicao] }, 'matriculas.inicio': { "$lt": new Date() }, 'matriculas.fim': { "$gte": new Date() } });
                aluno.turma = turma?.numero;
                aluno.curso = { turma };
                await aluno.save();
                user.profile = aluno;
                break;
            case 'parceiro':
                const parceiro = new Parceiro(req.body);
                user.profile = parceiro;
                await parceiro.save();
                break;
            default:
                return res.status(500).send(`${user.nome} está mal formatado!`);
        }
        await user.save();
        return res.send(`Perfil criado com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const editProfile = async (req, res) => {

    let { id } = req.params;
    if (!id) id = req.user.id;

    try {
        let user = await User.findById(id);
        switch (user.profile_type) {
            case 'aluno':
                await Aluno.findByIdAndUpdate(user.profile, { ...req.body }, { new: true })
                break;
            case 'parceiro':
                await Parceiro.findByIdAndUpdate(user.profile, { ...req.body }, { new: true })
                break;
            default:
                return res.send(`${user.name} está mal formatado!`);
        }
        return res.send(`${user.name} atualizado com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const setOpiniao = async (req, res) => {
    const id = req.user.id;

    try {
        let user = await User.findById(id);
        let aluno;
        const [curso, ...modulos] = req.body
        switch (user.profile_type) {
            case 'aluno':
                aluno = await Aluno.findById(user.profile);
                break;
            default:
                return res.send(`${user.name} não é um aluno!`);
        }
        aluno.curso.opiniao = { curso, modulos };
        await Aluno.findByIdAndUpdate(aluno._id, { curso: aluno.curso }, { new: true })
        // console.log(aluno.curso);
        // await aluno.save();
        return res.send(`${user.name}, Sua opinão foi registrada!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const editCurriculo = async (req, res) => {
    let { id } = req.params;
    let up = true;
    if (!id) {
        up = false
        id = req.user.id;
    };

    try {
        let c;
        let profile
        if (up) profile = await Aluno.findById(id);
        else {
            const user = await User.findById(id);
            profile = await Aluno.findById(user.profile);
        }
        if (!profile.curriculo) {
            const curriculo = new Curriculo(req.body);
            curriculo.save();
            profile.curriculo = curriculo;
            profile.save();
        } else c = await Curriculo.findByIdAndUpdate(profile.curriculo, { ...req.body }, { new: true })
        return res.send('Currículo Salvo com sucesso');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
}

const getCurriculo = async (req, res) => {
    let { id } = req.params;
    try {
        res.send(await Curriculo.findById(id));
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
}

module.exports = { createProfile, editProfile, editCurriculo, getCurriculo, setOpiniao }