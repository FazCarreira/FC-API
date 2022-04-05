const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const Aluno = require('../models/aluno-model');
const Modulo = require('../models/modulo-model');
const Turma = require('../models/turma-model');
const User = require('../models/user-model');

router.get(
    '/curso',
    auth,
    async (req, res) => {
        const { id } = req.user;
        try {
            const ids = await Modulo.find({ 'facilitador': id }).select('_id');
            const turmas = await Turma.find({ 'modulos': { '$in': ids } }).select('numero').select('forum').populate('modulos')
            const result = turmas.map(({ numero, modulos: m, forum, _id }) => {
                const avaliacoes = m.map(({ nome, avaliacao, aulas }) => ({ nome, avaliacao, aulas }));
                const modulos = m.filter(modulo => ids.some(({ _id }) => _id.toString() === modulo._id.toString()));
                return { numero, modulos, forum, _id, avaliacoes }
            })
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro no servidor');
        }
    }
);

router.get(
    '/turma/:numero',
    auth,
    async (req, res) => {
        const { numero } = req.params;
        try {
            const ids = await Aluno.find({ 'turma': numero.toString() }).select('_id');
            const alunos = await User.find({ 'profile': { '$in': ids } }).populate('profile');
            res.send(alunos);
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro no servidor');
        }
    }
);

router.post(
    '/materiais/:id/',
    auth,
    async (req, res) => {
        try {
            const modulo = await Modulo.findById(req.params.id);

            const material = {
                ...req.body,
                user: req.user.id
            };

            modulo.materiais.unshift(material);
            await modulo.save();

            return res.send(`Material adicionado com sucesso`);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

router.delete(
    '/materiais/:id/:material',
    auth,
    async (req, res) => {
        try {
            const modulo = await Modulo.findById(req.params.id);
            const material = modulo.materiais.find((material) => material.id === req.params.material);
            if (!material) return res.status(404).json({ msg: 'Material inexistente' });
            if (material.user.toString() === req.user.id || req.user.role === roles.admin) modulo.materiais = modulo.materiais.filter(({ id }) => id !== req.params.material);
            else return res.status(401).json({ msg: 'Usuário não autorizado' });
            await modulo.save();

            return res.json('Material apagado com sucesso!');
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Erro no servidor');
        }
    }
);

router.post(
    '/chamada/:id',
    auth,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { frequencia } = req.body;
            const modulo = await Modulo.findById(id).select('aulas');
            // modulo.toObject();
            // console.log(modulo.aulas[0]);
            frequencia.map((f, i) => modulo.aulas[i].frequencia = f);
            // console.log(modulo);
            await modulo.save();
            // const modulo = await Modulo.findByIdAndUpdate(
            //     id, { 'aulas.frequencia': frequencia }, { new: true }
            // )
            return res.send(`Chamada de ${modulo.nome} atualizada com sucesso!`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro no servidor');
        }
    }
);

router.post(
    '/avaliacao/:id',
    auth,
    async (req, res) => {
        try {
            const { id } = req.params;
            const modulo = await Modulo.findByIdAndUpdate(
                id, { 'avaliacao': req.body }, { new: true }
            )
            return res.send(`Avaliação de ${modulo.nome} atualizada com sucesso!`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro no servidor');
        }
    }
);

module.exports = router;