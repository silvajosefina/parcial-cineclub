import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'

const API_URL = import.meta.env.VITE_API_URL

const MovieDetail = () => {
    const { tmdbId } = useParams()
    const [movie, setMovie] = useState(null)

    const loadMovie = async () => {
        const url = `${API_URL}/api/movies/${tmdbId}`

        const response = await fetch(url)
        const data = await response.json()

        setMovie(data)
    }

    useEffect(() => {
        loadMovie()
    }, [tmdbId])

    const handleAddReview = async (review) => {
        const url = `${API_URL}/api/movies/${tmdbId}/reviews`

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })

        await loadMovie()
    }

    const handleDeleteReview = async (reviewId) => {
        const url = `${API_URL}/api/reviews/${reviewId}`

        await fetch(url, {
            method: 'DELETE'
        })

        await loadMovie()
    }

    if (!movie) {
        return <p>Cargando...</p>
    }

    return (
        <div>
            <Link to="/">Volver</Link>

            <h2>{movie.title}</h2>

            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Póster de ${movie.title}`}
                />
            )}

            <p>
                Fecha de estreno: {movie.release_date
                    ? movie.release_date
                    : 'Sin fecha'}
            </p>

            <p>{movie.overview}</p>

            <p>
                Puntaje: {movie.avgScore !== null
                    ? movie.avgScore
                    : 'Sin reseñas'}
            </p>

            <ReviewList
                reviews={movie.reviews}
                onDeleteReview={handleDeleteReview}
            />

            <ReviewForm onAddReview={handleAddReview} />
        </div>
    )
}

export default MovieDetail