const Post = require("../models/post-model");

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.send(`${post.title} criado com sucesso`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const getPosts = async (req, res) => {
    try {
        const result = await Post.find();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if(post.visits) post.visits++;
        else post.visits = 1;
        post.save();
        res.send(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const updatePost = async (req, res) => {
    try {
        let post = await Post.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body }, { new: true }
        )
        return res.send(`${req.body.title || post.title} atualizado!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const deletePost = async (req, res) => {
    function deleted(err, obj) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted post : ", obj)
        }
    }

    try {
        await Post.findOneAndDelete({ _id: req.params.id }, deleted);
        return res.send(`Postagem removida com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost
}