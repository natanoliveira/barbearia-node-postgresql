const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/authConfig.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

const UserController = {
    // Cadastrar um novo usuário
    async register(req, res) {

        console.log(req.body);

        const { name, email, password } = req.body;

        try {

            const exists = await User.findOne({ email: email });

            if (exists) {
                return res.status(400).send({ message: "E-mail já existente" });
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Criar usuário no banco de dados
            const user = await User.create({
                name: name.toUpperCase(),
                email: email,
                password: hashedPassword
            });

            console.log(user);

            user.password = undefined;
            user.updatedAt = undefined;

            token = generateToken({ id: user.id });

            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    },

    // Autenticar um usuário
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email: email } });

            // Verificar se o usuário existe
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            // Verificar se a senha está correta
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            // Atualizando o registro a data e hor ado acesso
            await User.update({ lastAcess: new Date() }, {
                where: {
                    email: email
                },
            });

            // Gerar token de autenticação
            // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const token = generateToken({ id: user.id });

            // Retornando somente o que quero
            const data = {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                token: token
            }

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    },

    async list(req, res) {
        try {
            const users = await User.findAll({ attributes: { exclude: ['password'] } });

            res.status(200).json({ data: users });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter usuários' });
        }
    },
};

module.exports = UserController;
