# TP Integrador - Alkemy (Módulo 6)

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

| Ruta      | Método | Respuesta                        |
|-----------|--------|-----------------------------------|
| `/`       | GET    | Vista HTML dinámica (Handlebars) |
| `/status` | GET    | JSON con estado del servidor      |

## Estructura del proyecto

```
├── controllers/    # Lógica de cada ruta
├── routes/         # Definición de rutas
├── middlewares/    # Middleware de logging (fs)
├── views/          # Vistas Handlebars (.hbs)
├── public/         # Archivos estáticos (CSS)
├── logs/           # Registro de visitas (log.txt)
├── index.js        # Archivo principal del servidor
```

## Decisiones técnicas

- **Archivo principal (`index.js`)**: se eligió este nombre porque es el estándar de la comunidad Node.js para el punto de entrada de una aplicación.
- **Motor de plantillas (Handlebars)**: se utilizó en vez de HTML estático puro para la ruta `/`, ya que permite generar contenido dinámico reutilizable mediante variables y layouts.
- **Persistencia en archivo plano**: se implementó un middleware (`middlewares/logger.js`) que registra cada visita al servidor (fecha, hora y ruta) en `logs/log.txt`, usando el módulo nativo `fs` de Node.