import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'

const API_URL = import.meta.env.VITE_API_URL

const MovieDetail = () => {
    const { tmdbId } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')

    const loadMovie = async () => {
        setLoading(true)
        setError('')

        try {
            const url = `${API_URL}/api/movies/${tmdbId}`

            const response = await fetch(url)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al cargar la película')
            }

            setMovie(data)
        } catch (error) {
            setMovie(null)
            setError('No se pudo conectar con el servidor')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMovie()
    }, [tmdbId])

    const handleAddReview = async (review) => {
        const url = `${API_URL}/api/movies/${tmdbId}/reviews`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'No se pudo agregar la reseña')
        }

        await loadMovie()
    }

    const handleDeleteReview = async (reviewId) => {
        setDeleteError('')

        try {
            const url = `${API_URL}/api/reviews/${reviewId}`

            const response = await fetch(url, {
                method: 'DELETE'
            })

            if (!response.ok) {
                let message = 'No se pudo eliminar la reseña'

                if (response.status !== 204) {
                    const data = await response.json()
                    message = data.error || message
                }

                throw new Error(message)
            }

            await loadMovie()
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                setDeleteError('No se pudo conectar con el servidor')
            } else {
                setDeleteError(error.message || 'No se pudo eliminar la reseña')
            }
        }
    }

    if (loading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return (
            <div>
                <Link to="/">Volver</Link>
                <p>{error}</p>
            </div>
        )
    }

    if (!movie) {
        return null
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

            {deleteError && <p>{deleteError}</p>}

            <ReviewForm onAddReview={handleAddReview} />
        </div>
    )
}

export default MovieDetail