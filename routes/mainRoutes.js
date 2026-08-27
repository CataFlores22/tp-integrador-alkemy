// Importamos el Router de Express (nos deja definir rutas por separado)
const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador
const { getHome, getStatus } = require('../controllers/mainController');

// Cuando alguien haga GET a / (raíz), se ejecuta getHome
router.get('/', getHome);

// Cuando alguien haga GET a /status, se ejecuta getStatus
router.get('/status', getStatus);

// Exportamos el router para poder usarlo en index.js
module.exports = router;