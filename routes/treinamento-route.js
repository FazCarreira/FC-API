const express = require('express');
const router = express.Router();

const { auth, admin } = require('../middlewares/auth');
const { createTreinamento, getTreinamentos, editTreinamentos, deleteTreinamento, participarFacilitador } = require('../controllers/treinamento-ctrl');

// @route    POST api/treinamento
// @desc     Cria uma nova treinamento
// @access   ADMIN
router.post('/', [auth, admin], createTreinamento);

// @route    POST api/treinamento/facilitador
// @desc     Facilitador completa etapa
// @access   ADMIN
router.post('/:id/:etapa_id', [auth], participarFacilitador);

// @route    GET api/treinamento
// @desc     Lê todas as treinamentos
// @access   ADMIN
router.get('/', [auth], getTreinamentos);

// @route    PUT api/treinamento
// @desc     Edita uma Treinamento
// @access   ADMIN
router.put('/:id', [auth, admin], editTreinamentos);

// @route    DELETE api/treinamento
// @desc     Edita uma Treinamento
// @access   ADMIN
router.delete('/:id', [auth, admin], deleteTreinamento);

module.exports = router;
