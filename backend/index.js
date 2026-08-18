require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

const reviews = []

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

        const moviesWithAvgScore = data.results.map(movie => {
            const movieReviews = reviews.filter(review => review.tmdbId === String(movie.id))
            const avgScore = movieReviews.length > 0
                ? movieReviews.reduce((sum, review) => sum + review.score, 0) / movieReviews.length
                : null
            return {
                ...movie,
                avgScore
            }
        })

        return res.json(moviesWithAvgScore)
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar películas' })
    }
})

app.get('/api/movies/:tmdbId', async (req, res) => {
    const tmdbId = req.params.tmdbId
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
        return res.status(404).json({ error: 'Película no encontrada' })
    }

    const movie = await response.json()
    const movieReviews = reviews.filter(review => review.tmdbId === tmdbId)

    const avgScore = movieReviews.length > 0
        ? movieReviews.reduce((sum, review) => sum + review.score, 0) / movieReviews.length
        : null

    return res.json({
        ...movie,
        reviews: movieReviews,
        avgScore
    })
})

app.post('/api/movies/:tmdbId/reviews', (req, res) => {
    const tmdbId = req.params.tmdbId
    const { author, score, comment } = req.body

    if (!author || !score || !comment) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    if (typeof score !== 'number' || score < 1 || score > 5) {
        return res.status(400).json({ error: 'El puntaje debe ser un número entre 1 y 5' })
    }

    const review = {
        id: Date.now(),
        tmdbId,
        author,
        score,
        comment
    }

    reviews.push(review)

    return res.status(201).json(review)
})

app.delete('/api/reviews/:reviewId', (req, res) => {
    const reviewId = Number(req.params.reviewId)
    const reviewIndex = reviews.findIndex(review => review.id === reviewId)

    if (reviewIndex === -1) {
        return res.status(404).json({ error: 'Reseña no encontrada' })
    }

    reviews.splice(reviewIndex, 1)

    return res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})