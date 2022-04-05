const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { admin, iSite, aluno } = require("../constants");
const Site = require('../models/site-model');
const User = require("../models/user-model");

const initialData = async () => {
    try {
        let userAdmin = await User.findOne({ email: 'admin@fazcarreira.com' });
        if (!userAdmin) {
            userAdmin = new User({ ...admin });
            const salt = await bcrypt.genSalt(10);
            userAdmin.password = await bcrypt.hash(userAdmin.password, salt);
            await userAdmin.save();
        }

        let userAluno = await User.findOne({ email: 'aluno@fazcarreira.com' });
        if (!userAluno) {
            userAluno = new User({ ...aluno });
            const salt = await bcrypt.genSalt(10);
            userAluno.avatar = gravatar.url(userAluno.email, { s: '200', r: 'pg', d: 'monsterid' });
            userAluno.password = await bcrypt.hash(userAluno.password, salt);
            await userAluno.save();
        }

        let site = await Site.findOne();
        if (site) return;
        site = new Site({ ...iSite });
        await site.save();

    } catch (err) {
        console.log("ERRO", err)
    }
}

module.exports = initialData;