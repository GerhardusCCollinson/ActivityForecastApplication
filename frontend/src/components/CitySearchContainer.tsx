import { useState } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { cityDetailsQuery } from '../queries/getCityDetails'
import type { CityDetails } from '../types/CityDetails'
import { SearchBarContainer } from './SearchBarContainer'
import { CitiesResultsContainer } from './CitiesResultsContainer'

export function CitySearchContainer() {
  const [term, setTerm] = useState('')
  const [runSearch, { data, loading, error, called }] = useLazyQuery<{ cityDetails: CityDetails[] }>(
    cityDetailsQuery
  )

  const handleSearch = (value: string) => {
    setTerm(value)
    if (value.length >= 2) {
      runSearch({ variables: { cityName: value } })
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <SearchBarContainer onSearch={handleSearch} />
      <CitiesResultsContainer
        query={term}
        hasSearched={called}
        loading={loading}
        error={error || undefined}
        results={data?.cityDetails ?? []}
      />
    </div>
  )
}


