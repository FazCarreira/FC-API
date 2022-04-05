const express = require('express');
const router = express.Router();

const { auth, admin } = require('../middlewares/auth');
const { createTrilha, getTrilhas, editTrilhas, deleteTrilha } = require('../controllers/trilha-ctrl');

// @route    POST api/trilha
// @desc     Cria uma nova trilha
// @access   ADMIN
router.post('/', [auth, admin], createTrilha);

// @route    GET api/trilha
// @desc     Lê todas as trilhas
// @access   ADMIN
router.get('/', [auth, admin], getTrilhas);

// @route    PUT api/trilha
// @desc     Edita uma Trilha
// @access   ADMIN
router.put('/:id', [auth, admin], editTrilhas);

// @route    DELETE api/trilha
// @desc     Edita uma Trilha
// @access   ADMIN
router.delete('/:id', [auth, admin], deleteTrilha);

module.exports = router;
