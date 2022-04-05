const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { auth, admin } = require('../middlewares/auth');
const { createTurma, getTurma, editTurmas, deleteTurma, editModulo, sendMsg, deleteMsg, addAluno, remAluno } = require('../controllers/turma-ctrl');

router.post('/:id', [auth, admin], createTurma);

router.get('/:id', [auth, admin], getTurma);

router.put('/:id', [auth, admin], editTurmas);

router.put('/modulo/:id', [auth, admin], editModulo);

router.delete('/:id', [auth, admin], deleteTurma);

router.post('/forum/:id', auth, check('text', 'Escreva algo!').notEmpty(), sendMsg);
router.delete('/forum/:id/:comment_id', auth, deleteMsg)

router.post('/add/:aluno_id/:turma_id', [auth, admin], addAluno);
router.delete('/rem/:aluno_id', [auth, admin], remAluno);

module.exports = router;
