const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rota para criar um novo agendamento
router.post('/', AppointmentController.create);
router.get('/', AppointmentController.list);
router.get('/date', AppointmentController.listByDate);
router.get('/date-service', AppointmentController.listByDateAndService);
router.get('/date-service-client', AppointmentController.listByDateAndServiceAndClient);
router.get('/client', AppointmentController.listByClient);
router.put('/confirm/:id', AppointmentController.confirmation);
router.put('/served/:id', AppointmentController.served);

module.exports = router;
