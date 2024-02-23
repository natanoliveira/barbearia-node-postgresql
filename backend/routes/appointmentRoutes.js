const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rota para criar um novo agendamento
router.post('/', AppointmentController.create);

// Rota para obter todos os agendamentos
router.get('/', AppointmentController.list);
router.get('/date', AppointmentController.listByDate);
router.get('/date-service', AppointmentController.listByDateAndService);
router.get('/date-service-client', AppointmentController.listByDateAndServiceAndClient);
router.get('/client', AppointmentController.listByClient);

module.exports = router;
