const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Service = require('../models/Service');
const Client = require('../models/Client');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
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
        allowNull: false,
        references: {
            model: 'Clients', // Nome do modelo de cliente
            key: 'id'        // Nome do campo de chave primária em Client
        }
    },
    serviceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Services', // Nome do modelo de serviço
            key: 'id'         // Nome do campo de chave primária em Service
        }
    },
    confirmation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    served: {
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

Appointment.belongsTo(Service, { foreignKey: 'serviceId' });
Appointment.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = Appointment;
