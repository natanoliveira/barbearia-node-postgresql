const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Appointment = require('./Appointment');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        field: 'createdAt',
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now')
    },
    updatedAt: {
        field: 'updatedAt',
        type: DataTypes.DATE,
    },
},
    { "timestamps": false });

// Define a relação entre Pagamento e Agendamento (Appointment)
Payment.belongsTo(Appointment, {
    foreignKey: {
        name: 'appointmentId',
        allowNull: false
    }
});

module.exports = Payment;
