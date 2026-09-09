const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = Usuario;