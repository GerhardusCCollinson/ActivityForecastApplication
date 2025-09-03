import { gql } from '@apollo/client'

export const cityDetailsQuery = gql`
  query CityDetails($cityName: String!) {
    cityDetails(cityName: $cityName) {
      name
      country
      countryCode
      latitude
      longitude
      elevation
      population
    }
  }
`
