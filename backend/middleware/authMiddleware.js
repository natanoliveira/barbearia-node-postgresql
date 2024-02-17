const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Verificar se o token JWT está presente nos cabeçalhos da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido ou formato inválido' });
    }

    // Extrair o token do cabeçalho da autorização
    const token = authHeader.split(' ')[1];

    // Verificar se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: 'Token de autenticação inválido' });
        }

        // Adicionar o ID do usuário decodificado à requisição para uso posterior
        req.userId = decoded.userId;

        // Continuar para a próxima middleware
        next();
    });
}

module.exports = authMiddleware;
