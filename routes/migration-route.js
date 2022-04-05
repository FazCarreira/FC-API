const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user-model');
const Parceiro = require('../models/parceiro-model');
const Aluno = require('../models/aluno-model');
const Turma = require('../models/turma-model');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

router.delete('/', async (req, res) => {
    const result = [];
    const { body } = req;
    try {
        await asyncForEach(body, async (a) => {
            const user = await User.findOne({ email: a.email });

            if (user)
                await User.deleteMany({ email: a.email }, function (err) {
                    if (err) console.log(err);
                });
            result.push(user);
        })
        return res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
})

router.put('/', async (req, res) => {
    const result = [];
    const turma = await Turma.findOne({ 'numero': '22' });
    const alunos = await Aluno.find({ 'turma': '22' })
    res.send(alunos);
})//61e42ff36fb62f3e1d14623f

router.post('/', async (req, res) => {
    const { facilitadores, facilitadoresPerfis } = req.body;
    const result = [];
    try {
        await asyncForEach(facilitadores, async facilitador => {
            const { email, role, legacy, name, phone } = facilitador;
            const user = new User({ email, role, legacy, name, phone });
            const salt = await bcrypt.genSalt(10);
            const password = '123'; //Math.random().toString().substr(2, 8);
            user.password = await bcrypt.hash(password, salt);
            user.profile_type = 'parceiro'

            const perfil = facilitadoresPerfis.filter(ap => ap.user === facilitador._id)?.[0];

            if (perfil) {
                delete perfil._id;
                const profile = new Parceiro({ ...perfil });
                user.profile = profile.id;
                user.created = perfil?.created;
                await profile.save();
            }

            // result.push(user);
            await user.save();

        })
        return res.send('GOGOGO');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }

});

module.exports = router;