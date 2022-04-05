const Treinamento = require("../models/treinamento-model");

const createTreinamento = async (req, res) => {
    try {
        const { nome, etapas } = req.body;
        const treinamento = new Treinamento({ nome, etapas: [] });
        etapas.forEach(nome => treinamento.etapas.push({ nome }));
        await treinamento.save();
        return res.send(`Treinamento criado com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const getTreinamentos = async (req, res) => {
    try {
        return res.send(await Treinamento.find().populate('etapas.file').populate('etapas.facilitador'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const editTreinamentos = async (req, res) => {
    const { id } = req.params;
    try {
        const treinamento = await Treinamento.findByIdAndUpdate(
            id, { ...req.body }, { new: true }
        )
        return res.send(`${req.body.nome || treinamento.nome} atualizado com sucesso!`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
    }
}

const deleteTreinamento = async (req, res) => {
    const { id } = req.params;
    function deleted(err, obj) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted treinamento : ", obj)
        }
    }

    try {
        await Treinamento.findByIdAndDelete(id, deleted);
        return res.send(`Treinamento removido com sucesso!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
}

const participarFacilitador = async (req, res) => {
    try {
        const treinamento = await Treinamento.findById(req.params.id);
        const etapa = treinamento.etapas.find((etapa) => etapa.id === req.params.etapa_id);
        if (!etapa) return res.status(404).json({ msg: 'Etapa inexistente' });
        etapa.participantes.push(req.user.id);
        treinamento.etapa = etapa;
        await treinamento.save();
        return res.send(`${etapa.nome} concluida!`);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Erro no servidor');
    }
}

module.exports = { createTreinamento, getTreinamentos, editTreinamentos, deleteTreinamento, participarFacilitador }