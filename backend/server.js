const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const sequelize = require('./database/database'); // Importe a instância do Sequelize

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = require('./swagger/swagger.json');

// Middleware para analisar corpos de solicitação JSON
app.use(bodyParser.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar o servidor
async function startServer() {
    try {
        // Sincronizar os modelos Sequelize com o banco de dados
        // await sequelize.sync({ alter: true });
        // await sequelize.sync();
        // await sequelize.sync({ force: true });

        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`🖥️ Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}

// Iniciar o servidor
startServer();
