const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Rota para criar um novo serviço
router.post('/', ServiceController.create);

// Rota para obter todos os serviços
router.get('/', ServiceController.getAll);

module.exports = router;
