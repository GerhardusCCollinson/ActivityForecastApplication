import type { CityDetails } from "../types/CityDetails"

export function CitiesResultsContainer(props: {
  query: string
  hasSearched: boolean
  loading: boolean
  error?: Error
  results: CityDetails[]
  onSelectCity?: (city: CityDetails) => void
}) {
  const { query, hasSearched, loading, error, results, onSelectCity } = props

  if (!hasSearched) {
    return <div>Search for a city to get started</div>
  }
  if (loading) {
    return <div>Searching “{query}”…</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!results || results.length === 0) {
    return <div>No results for “{query}”</div>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {results.map((c) => (
        <li key={`${c.name}-${c.countryCode}-${c.latitude}-${c.longitude}`}>
          <button
            style={{
              display: 'grid',
              gap: 4,
              width: '100%',
              padding: 8,
              textAlign: 'left',
              border: '1px solid #ddd',
              borderRadius: 6,
              background: 'white',
              cursor: 'pointer',
            }}
            onClick={() => onSelectCity?.(c)}
          >
            <div style={{ fontWeight: 600 }}>{c.name} <span style={{ color: '#666' }}>({c.countryCode})</span></div>
            <div style={{ color: '#444' }}>{c.country} · lat {c.latitude.toFixed(3)}, lon {c.longitude.toFixed(3)}</div>
            <div style={{ color: '#666', fontSize: 12 }}>Elevation {Math.round(c.elevation ?? 0)} m · Pop {c.population?.toLocaleString() ?? 'N/A'}</div>
          </button>
        </li>
      ))}
    </ul>
  )
}


