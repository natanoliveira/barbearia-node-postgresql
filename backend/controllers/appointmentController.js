const Appointment = require('../models/Appointment');
const helpers = require('../utils/helpers');

const AppointmentController = {

    async create(req, res) {

        const userId = req.userId;
        const { date, time, serviceId, clientId } = req.body;

        try {
            const appointment = await Appointment.create({
                date: date,
                time: time,
                userId: userId,
                serviceId: serviceId,
                clientId: clientId,
            });

            res.status(201).json({ message: 'Agendamento criado com sucesso', appointment });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar agendamento' });
        }
    },

    async list(req, res) {

        const { date, serviceId } = req.query;

        try {

            const appointments = await Appointment.findAll({ include: ['Service', 'Client'] });

            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    },

    async listByDate(req, res) {

        const date = req.query.date;

        try {

            if (!helpers.validateDate(date)) {
                return res.status(400).send({ message: "Data não enviada ou inválida" });
            }

            const condicao = {};
            condicao.date = date;

            const appointments = await Appointment.findAll({ where: condicao, include: ['Service', 'Client'] });

            res.status(200).json({ data: appointments });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    },

    async listByDateAndService(req, res) {

        const { date, serviceId } = req.query;

        try {

            if (!helpers.validateDate(date)) {
                return res.status(400).send({ message: "Data não enviada ou inválida" });
            }

            if (!serviceId) {
                return res.status(400).send({ message: "Serviço não enviado" });
            }

            const condicao = {};
            condicao.date = date;
            condicao.serviceId = serviceId;

            const appointments = await Appointment.findAll({ where: condicao, include: ['Service', 'Client'] });

            res.status(200).json({ data: appointments });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    },

    async listByDateAndServiceAndClient(req, res) {

        const { date, serviceId, clientId } = req.query;

        try {

            if (!helpers.validateDate(date)) {
                return res.status(400).send({ message: "Data não enviada ou inválida" });
            }

            if (!serviceId) {
                return res.status(400).send({ message: "Serviço não enviado" });
            }

            if (!clientId) {
                return res.status(400).send({ message: "Cliente não enviado" });
            }

            const condicao = {};
            condicao.date = date;
            condicao.serviceId = serviceId;
            condicao.clientId = clientId;

            const appointments = await Appointment.findAll({ where: condicao, include: ['Service', 'Client'] });

            res.status(200).json({ data: appointments });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    },

    async listByClient(req, res) {

        const { clientId } = req.query;

        try {

            if (!clientId) {
                return res.status(400).send({ message: "Cliente não enviado" });
            }

            const condicao = {};
            condicao.clientId = clientId;

            const appointments = await Appointment.findAll({ where: condicao, include: ['Service', 'Client'] });

            res.status(200).json({ data: appointments });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    },

    async confirmation(req, res) {

        const { id } = req.params;

        try {

            if (!id) {
                return res.status(400).send({ message: "Agendamento não enviado" });
            }

            const condicao = {};
            condicao.id = id;

            const appointments = await Appointment.update({ confirmation: true }, { where: condicao });

            res.status(200).json({ data: appointments });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    },

    async served(req, res) {

        const { id } = req.params;

        try {

            if (!id) {
                return res.status(400).send({ message: "Agendamento não enviado" });
            }

            const condicao = {};
            condicao.id = id;

            const appointments = await Appointment.update({ served: true }, { where: condicao });

            res.status(200).json({ data: appointments });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    },
};

module.exports = AppointmentController;
