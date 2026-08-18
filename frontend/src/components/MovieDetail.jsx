import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'

const API_URL = import.meta.env.VITE_API_URL

const scoreFormatter = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
})

const renderStars = (score) => {
    const filledStars = Math.round(score)

    return Array.from(
        { length: 5 },
        (_, index) => (
            <span
                key={index}
                className={
                    index < filledStars
                        ? 'star filled'
                        : 'star'
                }
            >
                ★
            </span>
        )
    )
}

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
            const url =
                `${API_URL}/api/movies/${tmdbId}`

            const response = await fetch(url)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    'Error al cargar la película'
                )
            }

            setMovie(data)
        } catch (error) {
            setMovie(null)

            if (error.message === 'Failed to fetch') {
                setError(
                    'No se pudo conectar con el servidor'
                )
            } else {
                setError(
                    error.message ||
                    'No se pudo cargar la película'
                )
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMovie()
    }, [tmdbId])

    const handleAddReview = async (review) => {
        const url =
            `${API_URL}/api/movies/${tmdbId}/reviews`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.error ||
                'No se pudo agregar la reseña'
            )
        }

        await loadMovie()
    }

    const handleDeleteReview = async (reviewId) => {
        setDeleteError('')

        try {
            const url =
                `${API_URL}/api/reviews/${reviewId}`

            const response = await fetch(url, {
                method: 'DELETE'
            })

            if (!response.ok) {
                let message =
                    'No se pudo eliminar la reseña'

                if (response.status !== 204) {
                    const data =
                        await response.json()

                    message =
                        data.error || message
                }

                throw new Error(message)
            }

            await loadMovie()
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                setDeleteError(
                    'No se pudo conectar con el servidor'
                )
            } else {
                setDeleteError(
                    error.message ||
                    'No se pudo eliminar la reseña'
                )
            }
        }
    }

    if (loading) {
        return (
            <p className="message">
                Cargando película...
            </p>
        )
    }

    if (error) {
        return (
            <p className="message error-message">
                {error}
            </p>
        )
    }

    if (!movie) {
        return null
    }

    const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : 'Sin fecha'

    return (
        <div className="movie-detail">
            <section className="movie-detail-main">
                {movie.poster_path ? (
                    <img
                        className="movie-detail-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`Póster de ${movie.title}`}
                    />
                ) : (
                    <div className="movie-detail-poster movie-placeholder">
                        Sin imagen
                    </div>
                )}

                <div className="movie-detail-info">
                    <h1>
                        {movie.title}
                    </h1>

                    <span className="year-pill">
                        {year}
                    </span>

                    {movie.avgScore !== null ? (
                        <div className="detail-rating">
                            <span className="detail-score">
                                {scoreFormatter.format(
                                    movie.avgScore
                                )}
                            </span>

                            <div>
                                <div className="stars detail-stars">
                                    {renderStars(
                                        movie.avgScore
                                    )}
                                </div>

                                <span className="review-count">
                                    Promedio de{' '}
                                    {movie.reviews.length}{' '}
                                    reseña
                                    {movie.reviews.length !== 1
                                        ? 's'
                                        : ''}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="no-rating detail-no-rating">
                            Sin reseñas todavía
                        </p>
                    )}

                    <p className="movie-overview">
                        {movie.overview ||
                            'Sin descripción disponible.'}
                    </p>
                </div>
            </section>

            <ReviewList
                reviews={movie.reviews}
                onDeleteReview={handleDeleteReview}
            />

            {deleteError && (
                <p className="message error-message">
                    {deleteError}
                </p>
            )}

            <ReviewForm
                onAddReview={handleAddReview}
            />
        </div>
    )
}

export default MovieDetail