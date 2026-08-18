# CineClub

CineClub es una aplicación web full stack que permite buscar películas, consultar sus detalles y agregar reseñas con un puntaje del 1 al 5.

La información de las películas se obtiene desde la API de TMDB a través del backend de la aplicación. Las reseñas se almacenan temporalmente en memoria en el servidor.

## Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- CORS
- dotenv
- API de TMDB

## Estructura del proyecto

El proyecto está dividido en dos partes:

```text
parcial-cineclub/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- Una API Key de TMDB

## Configuración del backend

Primero ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Dentro de la carpeta `backend` crear un archivo `.env` con la API Key de TMDB:

```env
TMDB_API_KEY=tu_api_key
```

Opcionalmente se puede indicar un puerto:

```env
PORT=3001
```

Si no se configura un puerto, el servidor utiliza el puerto `3001`.

Para iniciar el backend:

```bash
node index.js
```

El servidor quedará disponible en:

```text
http://localhost:3001
```

## Configuración del frontend

En otra terminal, ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Dentro de la carpeta `frontend` crear un archivo `.env` con la URL del backend:

```env
VITE_API_URL=http://localhost:3001
```

Luego iniciar el frontend:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, normalmente:

```text
http://localhost:5173
```

## Funcionalidades

La aplicación permite:

- Buscar películas por título.
- Mostrar los resultados con póster, título y año.
- Consultar el detalle de una película.
- Ver el promedio de las reseñas de los usuarios.
- Mostrar el puntaje mediante estrellas.
- Agregar una reseña con autor, puntaje del 1 al 5 y comentario.
- Eliminar reseñas.
- Mostrar estados de carga.
- Mostrar mensajes de error cuando una operación falla.
- Navegar entre la búsqueda y el detalle de cada película.

## API del backend

### Buscar películas

```http
GET /api/movies/search?q=:query
```

Busca películas en TMDB utilizando el texto recibido en el parámetro `q`.

Ejemplo:

```text
GET /api/movies/search?q=inception
```

### Obtener detalle de una película

```http
GET /api/movies/:tmdbId
```

Obtiene los datos de una película desde TMDB y agrega las reseñas almacenadas en el servidor junto con su puntaje promedio.

Ejemplo:

```text
GET /api/movies/27205
```

### Agregar una reseña

```http
POST /api/movies/:tmdbId/reviews
```

El cuerpo de la solicitud debe tener el siguiente formato:

```json
{
  "author": "Josefina",
  "score": 5,
  "comment": "Muy buena película"
}
```

El puntaje debe ser un número entre `1` y `5`.

### Eliminar una reseña

```http
DELETE /api/reviews/:reviewId
```

Elimina la reseña correspondiente al identificador recibido.

## Almacenamiento de reseñas

Las reseñas se almacenan en un array en memoria dentro del backend.

Esto significa que las reseñas existen mientras el servidor está ejecutándose. Si el backend se reinicia, las reseñas almacenadas se eliminan.

## Comunicación con TMDB

El frontend no realiza búsquedas directamente contra la API de TMDB.

El flujo de información es:

```text
React
  ↓
Backend Express
  ↓
API de TMDB
```

El backend recibe la solicitud del frontend, consulta TMDB y devuelve la información necesaria a React junto con las reseñas propias de la aplicación.

## Variables de entorno

Los archivos `.env` no deben subirse al repositorio porque contienen información de configuración privada, como la API Key de TMDB.

Por este motivo se encuentran incluidos en `.gitignore`.

### Backend

```env
TMDB_API_KEY=tu_api_key
PORT=3001
```

### Frontend

```env
VITE_API_URL=http://localhost:3001
```