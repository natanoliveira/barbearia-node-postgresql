const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rota para criar um novo serviço
router.post('/', paymentsController.create);
router.get('/', paymentsController.list);
router.get('/:id', paymentsController.show);
router.put('/:id', paymentsController.update);
router.delete('/:id', paymentsController.delete);

module.exports = router;
