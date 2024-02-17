const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
    // Cadastrar um novo usuário
    async register(req, res) {
        try {
            // Hash da senha
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Criar usuário no banco de dados
            const user = await User.create({
                email: req.body.email,
                password: hashedPassword
            });

            res.status(201).json({ message: 'Usuário criado com sucesso', user });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    },

    // Autenticar um usuário
    async login(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });

            // Verificar se o usuário existe
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            // Verificar se a senha está correta
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            // Gerar token de autenticação
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    }
};

module.exports = UserController;
