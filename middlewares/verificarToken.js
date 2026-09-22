const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // El token viene en el formato: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Token no proporcionado',
      data: null
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: 'error',
        message: 'Token inválido o expirado',
        data: null
      });
    }

    // Guardamos el payload decodificado en req.usuario
    req.usuario = decoded;
    next();
  });
}

module.exports = verificarToken;