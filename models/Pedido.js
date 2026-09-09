const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Pedido = sequelize.define('Pedido', {
    producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
    },
}, {
    tableName: 'pedidos',
    timestamps: false,
});

module.exports = Pedido;