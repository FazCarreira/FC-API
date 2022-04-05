const mongoose = require('mongoose');
const { roles } = require('../constants');
const Aluno = require('./aluno-model');
const Parceiro = require('./parceiro-model');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    legacy: {
        type: String,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.aluno
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'profile_type'
    },
    profile_type: {
        type: String,
        required: true,
        enum: ['aluno', 'parceiro'],
        default: 'aluno'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.post("remove", async function (res, next) {
    await Aluno.deleteOne({ _id: this.profile });
    await Parceiro.deleteOne({ _id: this.profile });
    next();
});

const User = mongoose.model('user', UserSchema);
module.exports = User;