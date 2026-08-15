require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

app.get('/api/movies/search', async (req, res) => {
    const query = req.query.q
    if (!query) {
        return res.status(400).json({ error: 'El parámetro q es obligatorio' })
    }

    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        const response = await fetch(url)
        const data = await response.json()

        return res.json(data.results)
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar películas' })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})