const express = require('express');
const router = express.Router();

const { createPost, getPosts, getPost, deletePost, updatePost } = require('../controllers/post-ctrl');

const { auth, admin } = require('../middlewares/auth');

router.get(
    '/',
    getPosts
);

router.get('/:id', getPost);
router.delete('/:id', [auth, admin], deletePost);
router.put('/:id', [auth, admin], updatePost);

router.post(
    '/',
    [auth, admin],
    createPost
);

module.exports = router;