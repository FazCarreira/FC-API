const express = require('express');
const router = express.Router();

const { auth, admin } = require('../middlewares/auth');
const Aluno = require('../models/aluno-model');
const Turma = require('../models/turma-model');
const User = require('../models/user-model');
const { setOpiniao } = require('../controllers/profile-ctrl');


const getCurso = async (req, res) => {
    let { id } = req.params;
    if (!id) id = req.user.id;

    try {
        const { profile } = await User.findById(id);
        const { curso } = await Aluno.findById(profile);
        const turma = await Turma.findById(curso?.turma).populate('modulos').populate({
            path: 'modulos',
            populate: {
                path: 'facilitador',
                model: 'user'
            }
        }).populate({
            path: 'modulos',
            populate: {
                path: 'file',
                model: 'file'
            }
        });
        res.send(turma);

    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

router.get('/curso', auth, getCurso);
router.get('/curso/:id', [auth, admin], getCurso);
router.put('/opiniao', [auth], setOpiniao);

module.exports = router;