const express = require('express');
const router = express.Router();

const { registro, login } = require('../controllers/authController');

// Cuando alguien haga POST a /registro, se ejecuta registro
router.post('/registro', registro);

// Cuando alguien haga POST a /login, se ejecuta login
router.post('/login', login);

module.exports = router;