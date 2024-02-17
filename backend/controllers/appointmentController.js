const Appointment = require('../models/Appointment');

const AppointmentController = {
    // Criar um novo agendamento
    async create(req, res) {
        try {
            const appointment = await Appointment.create({
                date: req.body.date,
                userId: req.body.userId,
                clientId: req.body.clientId,
                serviceId: req.body.serviceId
            });

            res.status(201).json({ message: 'Agendamento criado com sucesso', appointment });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar agendamento' });
        }
    },

    // Obter todos os agendamentos
    async getAll(req, res) {
        try {
            const appointments = await Appointment.findAll();

            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter agendamentos' });
        }
    }
};

module.exports = AppointmentController;
