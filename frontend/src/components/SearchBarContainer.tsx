import { useState } from 'react'

export function SearchBarContainer(props: {
  onSearch: (term: string) => void
}) {
  const { onSearch } = props
  const [search, setSearch] = useState('')

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
      <input
        type="text"
        placeholder="Search for a city…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, fontSize: 16 }}
        autoFocus
      />
      <button
        onClick={() => onSearch(search.trim())}
        style={{ padding: '8px 12px' }}
      >
        Search
      </button>
    </div>
  )
}


