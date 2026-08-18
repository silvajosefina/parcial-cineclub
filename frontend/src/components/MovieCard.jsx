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

const MovieCard = ({ movie, onSelect }) => {
    const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : 'Sin fecha'

    return (
        <article className="movie-card">
            {movie.poster_path ? (
                <img
                    className="movie-card-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Póster de ${movie.title}`}
                />
            ) : (
                <div className="movie-card-poster movie-placeholder">
                    Sin imagen
                </div>
            )}

            <div className="movie-card-content">
                <span className="year-pill">
                    {year}
                </span>

                <h2>{movie.title}</h2>

                {movie.avgScore !== null ? (
                    <div className="movie-card-rating">
                        <span className="card-score">
                            {scoreFormatter.format(
                                movie.avgScore
                            )}
                        </span>

                        <div className="stars">
                            {renderStars(
                                movie.avgScore
                            )}
                        </div>
                    </div>
                ) : (
                    <span className="no-rating">
                        Sin reseñas
                    </span>
                )}

                <button
                    className="detail-button"
                    onClick={() =>
                        onSelect(movie)
                    }
                >
                    Ver detalle
                </button>
            </div>
        </article>
    )
}

export default MovieCard