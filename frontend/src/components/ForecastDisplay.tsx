import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { activityForecastQuery } from '../queries/getActivityForecast'
import { type ActivityForecast } from '../types/ActivityForecast'

export function ForecastDisplay(props: { coords?: { latitude: number, longitude: number } | null }) {
  const { coords } = props
  const [fetchForecast, { data, loading, error, called }] = useLazyQuery<{activityForecast: ActivityForecast }>(activityForecastQuery)

  useEffect(() => {
    if (coords) {
      fetchForecast({ variables: { latitude: coords.latitude, longitude: coords.longitude } })
    }
  }, [coords, fetchForecast])

  if (!coords) return <div className="forecast-placeholder">Select a city to view its 7‑day forecast</div>
  if (loading && !data) return <div>Loading forecast…</div>
  if (error) return <div>Error loading forecast: {error.message}</div>
  if (!called || !data) return null

  const daily = data.activityForecast.daily
  const units = data.activityForecast.dailyUnits

  const LABELS: Record<string, string> = {
    ski: 'Ski',
    surf: 'Surf',
    outdoorSightseeing: 'Outdoor',
    indoorSightseeing: 'Indoor',
  }

  return (
    <div className="forecast">
      <div className="forecast-grid">
        {daily.time.map((iso, idx) => {
          const sortedActivityRankings = Object.entries(daily.activityRankings[idx])
            .filter(([name]) => name !== '__typename')
            .sort((a, b) => (b[1].score - a[1].score))

          return (
            <div className="forecast-card" key={iso}>
              <div className="forecast-date">{new Date(iso).toLocaleDateString()}</div>
              <div className="forecast-row"><span>Temp:</span> <strong>{daily.temperature[idx]}{units.temperature}</strong></div>
              <div className="forecast-row"><span>Wind:</span> <strong>{daily.windSpeedMax[idx]}{units.windSpeedMax}</strong></div>
              <div className="forecast-row"><span>Precip:</span> <strong>{daily.precipitation[idx]}{units.precipitation}</strong></div>
              <div className="forecast-activities">
                {sortedActivityRankings.map(([name, activityRanking]) => {
                  const score = Math.round(activityRanking.score)
                  const tier = !activityRanking.isPossible ? 'na' : score >= 7 ? 'good' : score >= 4 ? 'ok' : 'bad'
                  return (
                    <div className={`activity-card ${tier}`} key={name}>
                      <div className="activity-header">
                        <span className="activity-name">{LABELS[name] ?? name}</span>
                        <span className={`score score-${tier}`}>{activityRanking.isPossible ? score : '—'}</span>
                      </div>
                      <div className="activity-reason">{activityRanking.reason}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


