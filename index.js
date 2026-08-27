// Cargamos las variables de entorno definidas en el archivo .env
require('dotenv').config();

// Importamos Express
const express = require('express');
const path = require('path'); // Para armar rutas de carpetas de forma segura
const { engine } = require('express-handlebars'); // Motor de plantillas

// Importamos las rutas y el middleware que definimos en otros archivos
const mainRoutes = require('./routes/mainRoutes');
const logger = require('./middlewares/logger');

// Creamos la aplicación (nuestro servidor)
const app = express();

// Leemos el puerto desde .env, o usamos 3000 si no está definido
const PORT = process.env.PORT || 3000;

// Configuramos Handlebars como motor de vistas
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Servimos todo lo que esté en /public como contenido estático (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Registramos cada visita en logs/log.txt antes de llegar a las rutas
app.use(logger);

// Conectamos las rutas al servidor, montadas desde la URL base "/"
app.use('/', mainRoutes);

// Ponemos el servidor a escuchar en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});