import { useState } from 'react'

export function SearchBarContainer(props: {
  onSearch: (term: string) => void
}) {
  const { onSearch } = props
  const [search, setSearch] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(search.trim())
  }

  const isDisabled = search.trim().length < 2

  return (
    <form className="searchbar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="city-search" className="sr-only">Search for a city</label>
      <input
        id="city-search"
        name="city"
        className="searchbar-input"
        type="text"
        placeholder="Search for a city…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        autoFocus
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        Search
      </button>
    </form>
  )
}


