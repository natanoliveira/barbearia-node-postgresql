const Client = require('../models/Client');
const helpers = require('../utils/helpers');

const ClientController = {

    async create(req, res) {

        const { name, email, phone, born } = req.body;

        try {

            // Vamos validar sempre primeiro
            if (!helpers.validateEmail(email)) {
                return res.status(400).send({ message: "E-mail de formato inválido" });
            }

            const validPhone = helpers.validatePhone(phone);

            if (validPhone.length > 0) {
                return res.status(400).send({ message: validPhone });
            }

            if (!helpers.validateBorn(born)) {
                return res.status(400).send({ message: "Data de nascimento inválida" });
            }

            if (helpers.formatDate(born) == null) {
                return res.status(400).send({ message: "Data de nascimento inválida/mal formada" });
            }

            // Vamos verificar se existe o cliente com om esmo email
            const data = await Client.findOne({ where: { email: email } });

            if (data) {
                return res.status(400).send({ message: "Cliente já cadastrado para este e-mail" });
            }

            const client = await Client.create({
                name: name.toUpperCase(),
                email: email,
                phone: phone,
                born: helpers.formatDate(born),
            });

            client.age = helpers.getAge(born);

            res.status(201).json({ message: 'Cliente criado com sucesso', client });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar cliente' });
        }
    },

    async list(req, res) {
        try {
            const clients = await Client.findAll();

            res.status(200).json({ data: clients });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter clientes' });
        }
    },

    async show(req, res) {
        const id = req.params.id;

        try {
            const clients = await Client.findByPk(id);

            res.status(200).json({ data: clients });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter clientes' });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, email, phone, born } = req.body;

        try {

            // Vamos validar sempre primeiro
            if (!helpers.validateEmail(email)) {
                return res.status(400).send({ message: "E-mail de formato inválido" });
            }

            const validPhone = helpers.validatePhone(phone);

            if (validPhone.length > 0) {
                return res.status(400).send({ message: validPhone });
            }

            if (!helpers.validateBorn(born)) {
                return res.status(400).send({ message: "Data de nascimento inválida" });
            }

            if (helpers.formatDate(born) == null) {
                return res.status(400).send({ message: "Data de nascimento inválida/mal formada" });
            }

            // Vamos verificar se existe o cliente com om esmo email
            const client = await Client.findOne({ where: { id: id } });

            if (!client) {
                return res.status(400).send({ message: "Cliente não cadastrado" });
            }

            let newName = name.toUpperCase();

            client.name = newName;
            client.email = email;
            client.phone = phone;
            client.born = helpers.formatDate(born);
            client.updatedAt = new Date();

            await client.save();

            // Adicionando o elemento de idade dentro do objeto de retorno
            client.dataValues.age = helpers.getAge(helpers.formatDate(born));

            res.status(201).json({ message: 'Cliente atualizado com sucesso', client });
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            return res.status(500).json({ error: 'Erro ao atualizar cliente' });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            // Verificar se o cliente existe
            const client = await Client.findByPk(id);

            if (!client) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            // Excluir o Cliente
            await client.destroy();

            // Retorna uma resposta de sucesso
            return res.status(200).json({ message: 'Cliente excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            return res.status(500).json({ error: 'Erro ao excluir cliente' });
        }
    }

};

module.exports = ClientController;
