const { Sequelize } = require('sequelize');

// Configure as variáveis de ambiente
require('dotenv').config();

// Extraia as variáveis de ambiente
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// Crie uma nova instância do Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: (msg) => {
        console.log('[Sequelize]', msg); // Log personalizado com prefixo "[Sequelize]"
    }
});

// Teste a conexão com o banco de dados
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

// Teste a conexão com o banco de dados ao iniciar o aplicativo
testDatabaseConnection();

// Exporte a instância do Sequelize
module.exports = sequelize;
