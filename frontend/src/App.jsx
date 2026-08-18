import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'
import MovieDetail from './components/MovieDetail'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])

  const handleSearch = async (query) => {
    const url = `${API_URL}/api/movies/search?q=${encodeURIComponent(query)}`

    const response = await fetch(url)
    const data = await response.json()

    setMovies(data)
  }

  const handleSelectMovie = (movie) => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <main>
      <h1>CineClub</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSearch={handleSearch} />

              <MovieGrid
                movies={movies}
                onSelectMovie={handleSelectMovie}
              />
            </>
          }
        />

        <Route
          path="/movie/:tmdbId"
          element={<MovieDetail />}
        />
      </Routes>
    </main>
  )
}

export default App