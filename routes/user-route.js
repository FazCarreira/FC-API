const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { editUser, createUser, deleteUser, trocarSenha, getUser, getUsers } = require('../controllers/user-ctrl');

const { auth, admin } = require('../middlewares/auth');

// @route    GET api/users
// @desc     Recupera os usuários
// @access   ADMIN
router.get('/', [auth, admin], getUsers());
router.get('/aluno', [auth, admin], getUsers('aluno'));
router.get('/facilitador', [auth, admin], getUsers('facilitador'));
router.get('/empresa', [auth, admin], getUsers('empresa'));
router.get('/:id', [auth, admin], getUser);

// @route    POST api/users
// @desc     Cria um novo usuário
// @access   ADMIN
router.post(
    '/',
    check('email', 'Insira um email válido').isEmail(),
    [auth, admin],
    createUser
);

// @route    PUT api/users
// @desc     Edita o usuário
// @access   ADMIN
router.put('/:id',
    check('role', 'Não é possível alterar o tipo de um usuário').isEmpty(),
    check('password', 'Não é possível alterar a senha de um usuário').isEmpty(),
    check('email', 'Insira um email válido').isEmail(),
    [auth, admin],
    editUser
);

// @route    PUT api/users
// @desc     Edita o usuário
// @access   private
router.put('/',
    check('role', 'Não é possível alterar o tipo de um usuário').isEmpty(),
    check('password', 'Não é possível alterar a senha de um usuário').isEmpty(),
    check('email', 'Insira um email válido').isEmail(),
    [auth],
    editUser
);

// @route    PUT api/users
// @desc     Edita o usuário
// @access   ADMIN
router.delete('/:id', [auth, admin], deleteUser);

// @route    put api/users
// @desc     Troca a senha de um usuário
// @access   private
router.post(
    '/trocar_senha',
    check('password', 'Insira uma senha com 6 ou mais caracteres').isLength({ min: 6 }),
    [auth],
    trocarSenha
);


module.exports = router;
