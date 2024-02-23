const Payment = require('../models/Payment');
const helpers = require('../utils/helpers')

const PaymentController = {

    async create(req, res) {

        const { name, price } = req.body;

        try {

            // Vamos verificar se existe o cliente com om esmo email
            const data = await Payment.findOne({ where: { name: name.toUpperCase() } });

            if (data) {
                return res.status(400).send({ message: "Serviço já cadastrado", data });
            }

            const client = await Payment.create({
                name: name.toUpperCase(),
                price: helpers.convertCurrency(price)
            });

            res.status(201).json({ message: 'Serviço criado com sucesso', client });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar serviço' });
        }
    },

    async list(req, res) {
        try {
            const services = await Payment.findAll();

            res.status(200).json({ data: services });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter serviços' });
        }
    },

    async show(req, res) {
        const id = req.params.id;

        try {
            const clients = await Payment.findByPk(id);

            res.status(200).json({ data: clients });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter serviços' });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, price } = req.body;

        try {

            // Vamos verificar se existe o Serviço com om esmo email
            const service = await Payment.findOne({ where: { id: id } });

            if (!service) {
                return res.status(400).send({ message: "Serviço não cadastrado" });
            }

            let newName = name.toUpperCase();

            service.name = newName;
            service.price = helpers.convertCurrency(price);

            await Payment.save();

            res.status(201).json({ message: 'Serviço atualizado com sucesso', service });
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
            return res.status(500).json({ error: 'Erro ao atualizar serviço' });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            // Verificar se o serviço existe
            const service = await Payment.findByPk(id);

            if (!service) {
                return res.status(404).json({ error: 'Serviço não encontrado' });
            }

            // Excluir o serviço
            await Payment.destroy();

            // Retorna uma resposta de sucesso
            return res.status(200).json({ message: 'Serviço excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir serviço:', error);
            return res.status(500).json({ error: 'Erro ao excluir serviço' });
        }
    }

};

module.exports = PaymentController;
