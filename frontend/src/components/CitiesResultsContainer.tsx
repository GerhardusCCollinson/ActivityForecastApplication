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
    <ul className="city-results-list">
      {results.map((city) => (
        <li className="city-results-item" key={`${city.name}-${city.countryCode}-${city.latitude}-${city.longitude}`}>
          <button
            className="city-results-button"
            onClick={() => onSelectCity?.(city)}
          >
            <div className="city-title">
                <span><img src={`https://flagsapi.com/${city.countryCode}/flat/32.png`} /></span>{city.name}
                <span className="city-cc">({city.countryCode})</span>
            </div>
            <div className="city-sub">{city.country} · lat {city.latitude.toFixed(3)}, lon {city.longitude.toFixed(3)}</div>
            <div className="city-meta">Elevation {Math.round(city.elevation ?? 0)} m · Pop {city.population?.toLocaleString() ?? 'N/A'}</div>
          </button>
        </li>
      ))}
    </ul>
  )
}


