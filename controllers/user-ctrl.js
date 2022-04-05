const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

const User = require('../models/user-model');

const getUsers = (role) => async (req, res) => {
    try {
        if (role) return res.send(await User.find({ role }).select('-password').populate('profile'));
        else return res.send(await User.find().select('-password').populate('profile'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        return res.send(await User.findById(id).select('-password').populate('profile'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const editUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let { id } = req.params;
    if (!id) id = req.user.id;

    try {
        let user = await User.findByIdAndUpdate(
            id, { ...req.body }, { new: true }
        )
        return res.send(`${req.body.name || user.name} atualizado com sucesso!`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
}

const deleteUser = async (req, res) => {
    function deleted(err, obj) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted user : ", obj)
        }
    }

    try {
        await User.findByIdAndDelete(req.params.id, deleted);
        return res.send(`Usuário removido com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, role, legacy, name, phone } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user && !legacy) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Email já cadastrado' }] });
        }

        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'monsterid' });

        user = new User({
            email,
            avatar,
            role,
            legacy,
            name,
            phone
        });

        const salt = await bcrypt.genSalt(10);
        const password = '123'; //Math.random().toString().substr(2, 8);
        user.password = await bcrypt.hash(password, salt);


        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWTSECRET,
            { expiresIn: '60 days' },
            (err, token) => {
                if (err) throw err;
            }
        );

        await user.save();
        res.send(user.id);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
}

const trocarSenha = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        await User.findOneAndUpdate(
            { _id: req.user.id },
            { password: newPassword }, { new: true }
        )
        return res.send(`Sua senha foi atualizada com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = { getUsers, getUser, trocarSenha, createUser, deleteUser, editUser }