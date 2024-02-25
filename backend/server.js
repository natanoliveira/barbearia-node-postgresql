const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const moment = require('moment-timezone');
const cors = require('cors')

const sequelize = require('./database/database'); // Importe a instância do Sequelize

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = require('./swagger/swagger.json');

// Middleware para analisar corpos de solicitação JSON
app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {//Cabeçalhos permitidos
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
    );

    if (req.method === 'OPTIONS') {//Métdos permitidos
        req.headers('Access-Control-Allow-Methods', 'PUT, POST, PATHC, DELETE, GET, post, get');
        return res.status(200).send({});
    }

    next();
})

morgan.token('brDate', (req, res, tz) => {
    const timestamp = new Date().getTime();
    const brTimestamp = moment(timestamp).tz('America/Sao_Paulo');
    // return brTimestamp.format('DD/MM/YYYY HH:mm:ss');
    return brTimestamp;
});

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms -',
        // tokens.date(req, res)
        tokens.brDate(req, res)
    ].join(' ');
}));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
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
