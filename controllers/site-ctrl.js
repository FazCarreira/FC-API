const Site = require('../models/site-model');

const changeSite = async (req, res) => {
    try {
        const site = await Site.findOneAndUpdate(
            {},
            { ...req.body }, { new: true }
        )
        res.send('Site atualizado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const getSite = async (req, res) => res.send(await Site.findOne().populate('apoiadores.file').populate('parceiros.file').populate('opinioes.file'));

module.exports = {
    changeSite,
    getSite
}