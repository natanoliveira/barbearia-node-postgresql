const jwt = require('jsonwebtoken');
const authConfig = require('../configs/authConfig.json');

module.exports = (req, res, next) => {
    // console.log('ENTREI NO MIDDLEWARE ==> \n', req)
    // Verificar se o token JWT está presente nos cabeçalhos da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido ou formato inválido' });
    }

    // Extrair o token do cabeçalho da autorização
    // const token = authHeader.split(' ')[1];
    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ message: "Token incompleto" })
    }

    const [scheme, token] = parts;

    const regex = !/^Bearer$/i

    // Sem esquema
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ message: "Token mal formado" })
    }

    // Verificar se o token é válido
    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Token de autenticação inválido' });
        }

        // Adicionar o ID do usuário decodificado à requisição para uso posterior
        req.userId = decoded.id;

        // Continuar para a próxima middleware
        return next();
    });
}

// module.exports = authMiddleware;
