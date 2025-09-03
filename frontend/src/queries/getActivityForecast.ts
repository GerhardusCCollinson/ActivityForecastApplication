import { gql } from '@apollo/client'

export const activityForecastQuery = gql`
  query ActivityForecast($longitude: Float!, $latitude: Float!) {
    activityForecast(activityForecastInput: { longitude: $longitude, latitude: $latitude }) {
      elevation
      isCoastal
      dailyUnits {
        waveHeightMax
        wavePeriodMax
        temperature
        precipitation
        rain
        showers
        snowfall
        precipitationProbability
        sunshineDuration
        daylightDuration
        windSpeedMax
        time
      }
      daily {
        waveHeightMax
        wavePeriodMax
        temperature
        precipitation
        rain
        showers
        snowfall
        precipitationProbability
        sunshineDuration
        daylightDuration
        windSpeedMax
        weatherCode
        time
        activityRankings {
          ski { score isPossible reason }
          surf { score isPossible reason }
          indoorSightseeing { score isPossible reason }
          outdoorSightseeing { score isPossible reason }
        }
      }
    }
  }
`
