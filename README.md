# TP Integrador - Alkemy (Módulo 6,7 y 8)

Aplicación web con Node.js y Express, desarrollada como proyecto integrador de los módulos 6, 7 y 8 del bootcamp Full Stack de Alkemy.

## Parte 1 - Módulo 6: Primeros pasos con Node y Express

Servidor base con rutas públicas, vista dinámica con Handlebars, contenido estático y persistencia en archivo plano.

## Requisitos del sistema

- Node.js v18 o superior
- npm (incluido con Node.js)

## Instalación

1. Clonar el repositorio:

```
git clone <url-del-repo>
cd tp-integrador-alkemy
```

2. Instalar las dependencias:

```
npm install
```

3. Crear un archivo `.env` en la raíz con el siguiente contenido:

```
PORT=3000
JWT_SECRET=tu_clave_secreta_aqui
```

## Ejecución

Modo desarrollo (con reinicio automático):

```
npm run dev
```

Modo normal:

```
npm start
```

El servidor queda disponible en `http://localhost:3000`.

## Rutas disponibles

| Ruta                     | Método | Protegida | Respuesta                              |
|---------------------------|--------|-----------|------------------------------------------|
| `/`                        | GET    | No        | Vista HTML dinámica (Handlebars)         |
| `/status`                  | GET    | No        | JSON con estado del servidor              |
| `/registro`                | POST   | No        | Crea un usuario con contraseña encriptada |
| `/login`                   | POST   | No        | Devuelve un token JWT si las credenciales son válidas |
| `/usuarios`                | GET    | No        | Lista todos los usuarios                  |
| `/usuarios/:id/pedidos`    | GET    | No        | Usuario junto a sus pedidos               |
| `/pedidos`                 | POST   | **Sí**    | Crea un pedido                            |
| `/pedidos/:id`             | DELETE | **Sí**    | Elimina un pedido                         |
| `/usuarios-con-pedido`     | POST   | No        | Crea usuario y pedido en una transacción  |

## Estructura del proyecto

```
├── controllers/    # Lógica de cada ruta
├── routes/         # Definición de rutas
├── middlewares/    # Middleware de logging y verificación de JWT
├── models/         # Modelos Sequelize (Usuario, Pedido)
├── config/         # Configuración de conexión a la base de datos
├── views/          # Vistas Handlebars (.hbs)
├── public/         # Archivos estáticos (CSS)
├── logs/           # Registro de visitas (log.txt)
├── index.js        # Archivo principal del servidor
```

## Decisiones técnicas

- **Archivo principal (`index.js`)**: se eligió este nombre porque es el estándar de la comunidad Node.js para el punto de entrada de una aplicación.
- **Motor de plantillas (Handlebars)**: se utilizó en vez de HTML estático puro para la ruta `/`, ya que permite generar contenido dinámico reutilizable mediante variables y layouts.
- **Persistencia en archivo plano**: se implementó un middleware (`middlewares/logger.js`) que registra cada visita al servidor (fecha, hora y ruta) en `logs/log.txt`, usando el módulo nativo `fs` de Node.
## Autenticación con JWT

La API usa JSON Web Tokens para proteger las rutas de creación y eliminación de pedidos.

### Cómo autenticarse

1. Registra un usuario:
POST /registro
Body (JSON): { "nombre": "...", "correo": "...", "edad": ..., "contraseña": "..." }

2. Inicia sesión para obtener un token:
POST /login
Body (JSON): { "correo": "...", "contraseña": "..." }

La respuesta incluye un `token`. Ese token dura 1 hora.

3. Para acceder a una ruta protegida, envía el token en el header `Authorization`:
Authorization: Bearer <token>


### Rutas protegidas

- `POST /pedidos`
- `DELETE /pedidos/:id`

Se decidió proteger estas dos rutas porque modifican datos (crear y eliminar), a diferencia de las rutas de consulta (`GET`), que se dejaron abiertas para simplificar las pruebas del proyecto.

### Almacenamiento del token

El token no se guarda en el servidor (autenticación stateless). El cliente es responsable de guardarlo (por ejemplo, en `localStorage` en una app frontend) y enviarlo en cada petición a una ruta protegida.

### Seguridad de contraseñas

Las contraseñas nunca se guardan en texto plano: se encriptan con `bcrypt` antes de guardarse en la base de datos, y se comparan de forma segura en cada login.