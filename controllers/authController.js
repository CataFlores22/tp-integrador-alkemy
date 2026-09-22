const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const SECRET_KEY = process.env.JWT_SECRET;

// Controlador para el registro: crea un usuario nuevo con contraseña encriptada
const registro = async (req, res) => {
  try {
    const { nombre, correo, edad, contraseña } = req.body;

    // Encriptamos la contraseña antes de guardarla
    const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      edad,
      contraseña: contraseñaEncriptada
    });

    res.status(201).json({
      status: 'ok',
      message: 'Usuario registrado correctamente',
      data: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, correo: nuevoUsuario.correo }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al registrar usuario',
      data: null
    });
  }
};

// Controlador para el login: valida usuario y genera el token
const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas',
        data: null
      });
    }

    // Comparamos la contraseña enviada con la encriptada guardada
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas',
        data: null
      });
    }

    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      status: 'ok',
      message: 'Autenticación exitosa',
      data: { token }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al iniciar sesión',
      data: null
    });
  }
};

module.exports = { registro, login };