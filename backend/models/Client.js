const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    born: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    situation: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE'
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

module.exports = Client;
