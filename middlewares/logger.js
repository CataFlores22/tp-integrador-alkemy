// Importamos el módulo File System de Node, para leer/escribir archivos
const fs = require('fs');
const path = require('path');

// Middleware que registra cada visita en logs/log.txt
const logger = (req, res, next) => {
  // Armamos la fecha y hora actual en formato legible
  const fecha = new Date().toLocaleDateString('es-CL');
  const hora = new Date().toLocaleTimeString('es-CL');

  // Armamos la línea de texto a guardar
  const linea = `[${fecha} ${hora}] Ruta visitada: ${req.originalUrl}\n`;

  // Ruta al archivo de log, dentro de la carpeta logs/
  const rutaLog = path.join(__dirname, '..', 'logs', 'log.txt');

  // Agregamos la línea al final del archivo (lo crea si no existe)
  fs.appendFile(rutaLog, linea, (err) => {
    if (err) {
      console.error('Error al escribir en el log:', err);
    }
  });

  // Dejamos que la petición siga su curso normal
  next();
};

module.exports = logger;