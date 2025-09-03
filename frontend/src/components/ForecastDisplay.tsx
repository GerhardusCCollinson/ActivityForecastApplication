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


  return (
    <div className="forecast">
      <div className="forecast-grid">
        {daily.time.map((iso, idx) => {
            const sortedDailyActivityRankings = Object.entries(
                daily.activityRankings[idx]).sort((a, b) => b[1].score - a[1].score
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ).filter(([name, _]) => name !== '__typename')

            return (
                <div className="forecast-card" key={iso}>
                    <div className="forecast-date">{daily.weatherCode[idx]}{new Date(iso).toLocaleDateString()}</div>
                    <div className="forecast-row"><span>Temp:</span> <strong>{daily.temperature[idx]}{units.temperature}</strong></div>
                    <div className="forecast-row"><span>Wind:</span> <strong>{daily.windSpeedMax[idx]}{units.windSpeedMax}</strong></div>
                    <div className="forecast-row"><span>Precip:</span> <strong>{daily.precipitation[idx]}{units.precipitation}</strong></div>
                    <div className="forecast-activities">
                        {sortedDailyActivityRankings.map(([ activityName, activity ]) => (
                            <div className="activity"><span><span>{activityName}</span><span>{activity.reason}</span><strong>{activity.score?.toFixed(0)}</strong></span></div>
                        ))}
                    </div>
                </div>

            );
        }
        )}
      </div>
    </div>
  )
}


