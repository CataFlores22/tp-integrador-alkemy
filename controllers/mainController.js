// Controlador para la ruta / (página de inicio, vista dinámica)
// Renderiza views/index.hbs pasándole datos para las variables {{titulo}} y {{mensaje}}
const getHome = (req, res) => {
  res.render('index', {
    titulo: 'TP Integrador - Alkemy',
    mensaje: 'Servidor Node.js y Express funcionando correctamente.'
  });
};

// Controlador para la ruta /status
// Responde con un JSON indicando que el servidor está activo
const getStatus = (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
};

// Exportamos la función para poder usarla en las rutas
module.exports = { getHome, getStatus };