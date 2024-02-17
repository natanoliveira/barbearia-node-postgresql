const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    serviceId: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = Appointment;
