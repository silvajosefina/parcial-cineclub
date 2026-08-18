import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL

const MovieDetail = () => {
    const { tmdbId } = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const loadMovie = async () => {
            const url = `${API_URL}/api/movies/${tmdbId}`

            const response = await fetch(url)
            const data = await response.json()

            setMovie(data)
        }

        loadMovie()
    }, [tmdbId])

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
        </div>
    )
}

export default MovieDetail