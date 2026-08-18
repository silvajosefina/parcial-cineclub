import { useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'
import MovieDetail from './components/MovieDetail'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastQuery, setLastQuery] = useState('')

  const isDetail = location.pathname.startsWith('/movie/')

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setError('Ingresá una película para buscar')
      setMovies([])
      setLastQuery('')
      return
    }

    setLoading(true)
    setError('')

    try {
      const url = `${API_URL}/api/movies/search?q=${encodeURIComponent(trimmedQuery)}`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al buscar películas')
      }

      setMovies(data)
      setLastQuery(trimmedQuery)
    } catch (error) {
      setMovies([])
      setLastQuery(trimmedQuery)

      if (error.message === 'Failed to fetch') {
        setError('No se pudo conectar con el servidor')
      } else {
        setError(
          error.message || 'No se pudo realizar la búsqueda'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSelectMovie = (movie) => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-content">
          <Link to="/" className="brand">
            CineClub
          </Link>

          {isDetail && (
            <Link to="/" className="topbar-back">
              Volver a búsqueda
            </Link>
          )}
        </div>
      </header>

      <main className="app">
        <Routes>
          <Route
            path="/"
            element={
              <section className="search-page">
                <div className="search-intro">
                  <h1>Encontrá una película</h1>

                  <p>
                    Buscá títulos, consultá sus detalles y compartí tu opinión.
                  </p>
                </div>

                <SearchBar onSearch={handleSearch} />

                {loading && (
                  <p className="message">
                    Buscando películas...
                  </p>
                )}

                {error && (
                  <p className="message error-message">
                    {error}
                  </p>
                )}

                {!loading && !error && lastQuery && (
                  <div className="results-header">
                    <p>
                      {movies.length} resultado
                      {movies.length !== 1 ? 's' : ''} para{' '}
                      <strong>"{lastQuery}"</strong>
                    </p>
                  </div>
                )}

                {!loading &&
                  !error &&
                  lastQuery &&
                  movies.length === 0 && (
                    <div className="empty-state">
                      No se encontraron películas.
                    </div>
                  )}

                {!loading && movies.length > 0 && (
                  <MovieGrid
                    movies={movies}
                    onSelectMovie={handleSelectMovie}
                  />
                )}
              </section>
            }
          />

          <Route
            path="/movie/:tmdbId"
            element={<MovieDetail />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App