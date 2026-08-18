const MovieCard = ({ movie }) => {
    return (
        <div>
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Póster de ${movie.title}`}
                />
            )}

            <h2>{movie.title}</h2>

            <p>
                {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : 'Sin fecha'}
            </p>

            <p>
                Puntaje: {movie.avgScore !== null
                    ? movie.avgScore
                    : 'Sin reseñas'}
            </p>
        </div>
    )
}

export default MovieCard