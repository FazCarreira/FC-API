const Trilha = require("../models/trilha-model");

const createTrilha = async (req, res) => {
    try {
        const trilha = new Trilha(req.body);
        await trilha.save();
        return res.send(`Trilha criada com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const getTrilhas = async (req, res) => {
    try {
        return res.send(await Trilha.find().populate('turmas'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const editTrilhas = async (req, res) => {
    const { id } = req.params;
    try {
        const trilha = await Trilha.findByIdAndUpdate(
            id, { ...req.body }, { new: true }
        )
        return res.send(`${req.body.nome || trilha.nome} atualizado com sucesso!`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
}

const deleteTrilha = async (req, res) => {
    const { id } = req.params;
    function deleted(err, obj) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted trilha : ", obj)
        }
    }

    try {
        await Trilha.findByIdAndDelete(id, deleted);
        return res.send(`Trilha removida com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = { createTrilha, getTrilhas, editTrilhas, deleteTrilha }