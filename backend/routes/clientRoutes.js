const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Rota para criar um novo cliente
router.post('/', ClientController.create);
router.get('/', ClientController.list);
router.get('/:id', ClientController.show);
router.put('/:id', ClientController.update);
router.delete('/:id', ClientController.delete);

module.exports = router;
