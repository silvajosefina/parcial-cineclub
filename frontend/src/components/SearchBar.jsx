import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar película..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <button onClick={() => onSearch(query)}>Buscar</button>
        </div>
    )
}

export default SearchBar