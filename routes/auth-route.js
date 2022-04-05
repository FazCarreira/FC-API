const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { auth } = require('../middlewares/auth');

const { loginUser, getUser, register } = require('../controllers/auth-ctrl');

// @route    POST api/auth
// @desc     Login no usuário
// @access   Public
router.post(
    '/',
    check('email', 'Insira um email').exists(),
    check('password', 'Insira uma senha').exists(),
    loginUser
);

// @route    GET api/auth
// @desc     Verifica o usuário pelo token
// @access   Private
router.get('/', auth, getUser);

// @route    PUT api/auth
// @desc     Registra um novo usuário
// @access   Public
router.put('/',
    check('password', 'Insira uma senha com 6 ou mais caracteres').isLength({ min: 6 }),
    check('phone', 'Qual seu telefone?').notEmpty(),
    check('email', 'Por favor insira um email válido').isEmail(),
    check('name', 'Qual seu nome?').notEmpty(),
    register
)

module.exports = router;