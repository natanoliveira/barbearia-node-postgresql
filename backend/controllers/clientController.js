const Client = require('../models/Client');

const ClientController = {
    // Criar um novo cliente
    async create(req, res) {
        try {
            const client = await Client.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            });

            res.status(201).json({ message: 'Cliente criado com sucesso', client });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar cliente' });
        }
    },

    // Obter todos os clientes
    async list(req, res) {
        try {
            const clients = await Client.findAll();

            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter clientes' });
        }
    },

    async show(req, res) {
        const id = req.params.id;

        try {
            const clients = await Client.findByPk(id);

            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter clientes' });
        }
    },

    async update(req, res) {
        const { id } = req.params;

        try {
            // Verificar se o usuário existe
            const client = await Client.findByPk(id);

            if (!client) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Atualizar os campos do usuário com os novos valores
            await client.update(req.body);

            // Retorna o usuário atualizado
            return res.status(200).json({ message: 'Cliente atualizado com sucesso', client });
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            return res.status(500).json({ error: 'Erro ao atualizar cliente' });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            // Verificar se o usuário existe
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Excluir o usuário
            await user.destroy();

            // Retorna uma resposta de sucesso
            return res.status(200).json({ message: 'Usuário excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return res.status(500).json({ error: 'Erro ao excluir usuário' });
        }
    }


};

module.exports = ClientController;
