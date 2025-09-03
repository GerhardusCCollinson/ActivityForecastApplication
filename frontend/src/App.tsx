import './App.css'
import { CitySearchContainer } from './components/CitySearchContainer'
import { ForecastDisplay } from './components/ForecastDisplay'
import { useState } from 'react'

function App() {
  const [coords, setCoords] = useState<{ latitude: number, longitude: number } | null>(null)

  return (
    <div className="app-container">
      <h1>City search</h1>
      <div className="app-grid">
        <div className="col-left">
          <CitySearchContainer onSelectCoords={setCoords} />
        </div>
        <div className="col-right">
          <ForecastDisplay coords={coords} />
        </div>
      </div>
    </div>
  )
}

export default App
