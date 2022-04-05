const { validationResult } = require('express-validator');
const { asyncForEach, roles } = require("../constants");
const Modulo = require("../models/modulo-model");
const Trilha = require("../models/trilha-model");
const Turma = require("../models/turma-model");
const User = require('../models/user-model');

const createTurma = async (req, res) => {
    let { id } = req.params;
    try {
        const trilha = await Trilha.findById(id).populate('turmas');
        const turma = new Turma(req.body);
        turma.modulos = [];
        await asyncForEach(trilha.modulos, (async nome => {
            const modulo = new Modulo({ nome })
            await modulo.save();
            turma.modulos.push(modulo);
        }))
        await turma.save();
        // const { turmas } = trilha;
        trilha.turmas.unshift(turma);
        // await Turma.findByIdAndUpdate(id, { turmas }, { new: true });
        await trilha.save();
        return res.send(`Turma criada com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const getTurma = async (req, res) => {
    let { id } = req.params;
    try {
        return res.send(await Turma.findById(id).populate('modulos').populate({
            path: 'modulos',
            populate: {
                path: 'file',
                model: 'file',
            },
        }));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const editTurmas = async (req, res) => {
    const { id } = req.params;
    try {
        const turma = await Turma.findByIdAndUpdate(
            id, { ...req.body }, { new: true }
        )
        return res.send(`Turma ${turma.numero} atualizada com sucesso!`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
}

const deleteTurma = async (req, res) => {
    const { id } = req.params;
    function deleted(err, obj) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted turma : ", obj)
        }
    }

    try {
        await Turma.findByIdAndDelete(id, deleted);
        return res.send(`Turma removida com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const editModulo = async (req, res) => {
    const { id } = req.params;
    try {
        const modulo = await Modulo.findByIdAndUpdate(
            id, { ...req.body }, { new: true }
        )
        return res.send(`${req.body.nome || modulo.nome} atualizado com sucesso!`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
}

const addAluno = async (req, res) => {
    const { aluno_id, turma_id } = req.params;
    try {
        const { profile, name } = await User.findById(aluno_id).populate('profile');
        const turma = await Turma.findById(turma_id);
        profile.turma = turma.numero;
        profile.curso = { turma };
        await profile.save();
        return res.send(`${name} adicionado a turma ${turma.numero} com sucesso!`);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Erro no servidor');
    }
}

const remAluno = async (req, res) => {
    const { aluno_id } = req.params;
    try {
        const { profile, name } = await User.findById(aluno_id).populate('profile');
        profile.turma = '--';
        profile.curso = { turma: null };
        await profile.save();
        return res.send(`${name} removido da turma com sucesso!`);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Erro no servidor');
    }
}

const sendMsg = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const turma = await Turma.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        turma.forum.unshift(newComment);
        await turma.save();

        return res.send('Comentário enviado com sucesso');
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Erro no servidor');
    }
}

const deleteMsg = async (req, res) => {
    try {
        const turma = await Turma.findById(req.params.id);
        const comment = turma.forum.find((comment) => comment.id === req.params.comment_id);
        if (!comment) return res.status(404).json({ msg: 'Mensagem inexistente' });
        if (comment.user.toString() === req.user.id || req.user.role === roles.admin) turma.forum = turma.forum.filter(({ id }) => id !== req.params.comment_id);
        else return res.status(401).json({ msg: 'Usuário não autorizado' });
        await turma.save();

        return res.json('Comentário apagado com sucesso!');
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Erro no servidor');
    }
}

module.exports = { createTurma, getTurma, editTurmas, deleteTurma, editModulo, sendMsg, deleteMsg, addAluno, remAluno }