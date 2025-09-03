import './App.css'
import { CitySearchContainer } from './components/CitySearchContainer'

function App() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1>City search</h1>
      <CitySearchContainer />
    </div>
  )
}

export default App
