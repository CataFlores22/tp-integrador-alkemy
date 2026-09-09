const sequelize = require('../config/sequelize');
const Usuario = require('./Usuarios');
const Pedido = require('./Pedido');

// Un usuario puede tener muchos pedidos
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });

// Cada pedido pertenece a un usuario
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = { sequelize, Usuario, Pedido };