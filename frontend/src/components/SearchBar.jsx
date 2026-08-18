import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onSearch(query)
    }

    return (
        <form
            className="search-bar"
            onSubmit={handleSubmit}
        >
            <div className="search-input-wrapper">
                <svg
                    className="search-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                    />
                    <path d="M16 16L21 21" />
                </svg>

                <input
                    type="text"
                    placeholder="Buscar una película..."
                    value={query}
                    onChange={(event) =>
                        setQuery(event.target.value)
                    }
                />
            </div>

            <button type="submit">
                Buscar
            </button>
        </form>
    )
}

export default SearchBar