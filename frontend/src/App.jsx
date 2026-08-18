import { useState } from 'react'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [movies, setMovies] = useState([])

  const handleSearch = async (query) => {
    const url = `${API_URL}/api/movies/search?q=${encodeURIComponent(query)}`

    const response = await fetch(url)
    const data = await response.json()

    setMovies(data)
  }

  return (
    <main>
      <h1>CineClub</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieGrid movies={movies} />
    </main>
  )
}

export default App

