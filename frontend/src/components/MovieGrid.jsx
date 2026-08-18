import MovieCard from './MovieCard'

const MovieGrid = ({ movies, onSelectMovie }) => {
    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={onSelectMovie}
                />
            ))}
        </div>
    )
}

export default MovieGrid