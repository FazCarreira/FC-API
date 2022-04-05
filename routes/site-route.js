const express = require('express');
const router = express.Router();

const { getSite, changeSite } = require('../controllers/site-ctrl');

const { auth, admin } = require('../middlewares/auth');

// @route    GET api/site
// @desc     Recupera os dados do site
// @access   Public
router.get(
    '/',
    getSite
);

// @route    POST api/site
// @desc     Atualiza os dados do site
// @access   Private
router.post(
    '/',
    [auth, admin],
    changeSite
);

module.exports = router;