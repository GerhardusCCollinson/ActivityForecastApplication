import { useState } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { cityDetailsQuery } from '../queries/getCityDetails'
import type { CityDetails } from '../types/CityDetails'
import { SearchBarContainer } from './SearchBarContainer'
import { CitiesResultsContainer } from './CitiesResultsContainer'

export function CitySearchContainer(props: { onSelectCoords?: (coords: { latitude: number, longitude: number }) => void }) {
  const { onSelectCoords } = props
  const [term, setTerm] = useState('')
  const [selected, setSelected] = useState<{ latitude: number, longitude: number } | null>(null)
  const [runSearch, { data, loading, error, called }] = useLazyQuery<{ cityDetails: CityDetails[] }>(
    cityDetailsQuery
  )

  const handleSearch = (value: string) => {
    setTerm(value)
    if (value.length >= 2) {
      runSearch({ variables: { cityName: value } })
    }
  }

  const handleSelect = (city: CityDetails) => {
    const coords = { latitude: city.latitude, longitude: city.longitude }
    setSelected(coords)
    onSelectCoords?.(coords)
  }

  return (
    <div className="city-search">
      <SearchBarContainer onSearch={handleSearch} />
      <CitiesResultsContainer
        query={term}
        hasSearched={called}
        loading={loading}
        error={error || undefined}
        results={data?.cityDetails ?? []}
        selected={selected || undefined}
        onSelectCity={handleSelect}
      />
    </div>
  )
}


