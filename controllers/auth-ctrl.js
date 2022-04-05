const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { roles } = require('../constants');

const User = require("../models/user-model");

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('profile');
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'ERRO NO SERVIDOR', error: err.message });
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.findOne({ legacy: email })
            if (!user) return res.status(400).json({ errors: [{ msg: 'Email ou Senha Inválidos' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Email ou Senha Inválidos' }] });
        }

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
                res.json({ token, id: user.id });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'ERRO NO SERVIDOR', error: err.message });
    }
}

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Email já cadastrado' }] });
        }

        if (role === roles.admin) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'THERE CAN BE ONLY ONE! DONT TRY ME!' }] });
        }

        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'monsterid' });

        const profile_type = role === roles.aluno ? 'aluno' : 'parceiro';

        user = new User({ avatar, profile_type, ...req.body });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'ERRO NO SERVIDOR', error: err.message });
    }
}

module.exports = {
    getUser,
    loginUser,
    register
}