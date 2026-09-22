// Importamos el Router de Express (nos deja definir rutas por separado)
const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador
const { getHome, getStatus, getUsuariosORM, getUsuarioConPedidos, crearPedido, eliminarPedido, crearUsuarioConPedido } = require('../controllers/mainController');

const verificarToken = require('../middlewares/verificarToken');
// Cuando alguien haga GET a / (raíz), se ejecuta getHome
router.get('/', getHome);

// Cuando alguien haga GET a /status, se ejecuta getStatus
router.get('/status', getStatus);

// Cuando alguien haga GET a /usuarios, se ejecuta getUsuariosORM
router.get('/usuarios', getUsuariosORM);

// Cuando alguien haga GET a /usuarios/:id/pedidos, se ejecuta getUsuarioConPedidos
router.get('/usuarios/:id/pedidos', getUsuarioConPedidos);

// Cuando alguien haga POST a /pedidos, se ejecuta crearPedido
router.post('/pedidos', verificarToken, crearPedido);

// Cuando alguien haga DELETE a /pedidos/:id, se ejecuta eliminarPedido
router.delete('/pedidos/:id', verificarToken, eliminarPedido);

// Cuando alguien haga POST a /usuarios-con-pedido, se ejecuta crearUsuarioConPedido
router.post('/usuarios-con-pedido', crearUsuarioConPedido);

// Exportamos el router para poder usarlo en index.js
module.exports = router;