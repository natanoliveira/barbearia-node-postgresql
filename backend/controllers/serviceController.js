const Service = require('../models/Service');

const ServiceController = {
    // Criar um novo serviço
    async create(req, res) {
        try {
            const service = await Service.create({
                name: req.body.name,
                price: req.body.price
            });

            res.status(201).json({ message: 'Serviço criado com sucesso', service });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar serviço' });
        }
    },

    // Obter todos os serviços
    async getAll(req, res) {
        try {
            const services = await Service.findAll();

            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter serviços' });
        }
    }
};

module.exports = ServiceController;
