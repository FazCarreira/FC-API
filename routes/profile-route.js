const express = require('express');
const router = express.Router();
const { createProfile, editProfile, editCurriculo, getCurriculo } = require('../controllers/profile-ctrl');

const { auth, admin } = require('../middlewares/auth');

// @route    POST api/profile
// @desc     Cria o perfil do usuário
// @access   private
router.post('/', [auth], createProfile);

// @route    GET api/profile
// @desc     Envia o curriculo
// @access   private
router.get('/curriculo/:id',
    [auth],
    getCurriculo
);

// @route    PUT api/profile
// @desc     Edita o curriculo
// @access   ADMIN
router.put('/curriculo/:id',
    [auth, admin],
    editCurriculo
);

// @route    PUT api/profile
// @desc     Edita o curriculo
// @access   private
router.put('/curriculo',
    [auth],
    editCurriculo
);

// @route    PUT api/profile
// @desc     Edita o perfil
// @access   ADMIN
router.put('/:id',
    [auth, admin],
    editProfile
);

// @route    PUT api/profile
// @desc     Edita o perfil
// @access   private
router.put('/',
    [auth],
    editProfile
);

module.exports = router;
