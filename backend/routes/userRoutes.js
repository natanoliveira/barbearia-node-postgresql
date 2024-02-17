const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Rota para registrar um novo usuário
router.post('/register', UserController.register);

// Rota para autenticar um usuário
router.post('/login', UserController.login);

module.exports = router;
