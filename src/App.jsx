import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Plants from './pages/Plants.jsx'
import PlantDetails from './pages/PlantDetails.jsx'
import AddPlant from './pages/AddPlant.jsx'
import CareSchedule from './pages/CareSchedule.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <Navbar />
      <main className="app-main">
        <div className="app-main-inner">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/plants/:id" element={<PlantDetails />} />
            <Route path="/add-plant" element={<AddPlant />} />
            <Route path="/care" element={<CareSchedule />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
