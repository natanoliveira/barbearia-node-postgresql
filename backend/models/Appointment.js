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
    time: {
        type: DataTypes.TIME,
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
    },
    situation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
}, { "timestamps": false });

module.exports = Appointment;
