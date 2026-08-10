import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { usePlants } from '../context/PlantContext.jsx'
import PlantCard from '../components/PlantCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { getHealthCategory, getWateringStatus } from '../utils/plantUtils.js'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'attention', label: 'Needs Attention' },
  { id: 'water', label: 'Needs Water' },
]

const SORTS = [
  { id: 'name', label: 'Name' },
  { id: 'health', label: 'Health' },
  { id: 'watering', label: 'Watering Due' },
]

export default function Plants() {
  const { plants } = usePlants()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('name')

  const visiblePlants = useMemo(() => {
    let result = plants.filter((plant) => {
      const matchesQuery =
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.species.toLowerCase().includes(query.toLowerCase())
      if (!matchesQuery) return false

      if (filter === 'healthy') return getHealthCategory(plant.health) === 'healthy'
      if (filter === 'attention') return getHealthCategory(plant.health) === 'attention' || getHealthCategory(plant.health) === 'critical'
      if (filter === 'water') {
        const status = getWateringStatus(plant)
        return status === 'today' || status === 'overdue'
      }
      return true
    })

    result = [...result].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'health') return b.health - a.health
      if (sort === 'watering') {
        const aStatus = getWateringStatus(a)
        const bStatus = getWateringStatus(b)
        const order = { overdue: 0, today: 1, soon: 2, ok: 3 }
        return order[aStatus] - order[bStatus]
      }
      return 0
    })

    return result
  }, [plants, query, filter, sort])

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>My Plants</h1>
          <p className="page-subtitle">
            {plants.length} plant{plants.length === 1 ? '' : 's'} in your garden
          </p>
        </div>
        <Link to="/add-plant" className="btn btn-primary">
          <Plus size={17} strokeWidth={2.3} />
          <span>Add Plant</span>
        </Link>
      </div>

      {plants.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="plants-toolbar">
            <SearchBar value={query} onChange={setQuery} />

            <div className="filter-pills">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={'filter-pill' + (filter === f.id ? ' filter-pill-active' : '')}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort plants"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>

          {visiblePlants.length === 0 ? (
            <div className="no-results">
              <p>No plants match your search or filter.</p>
            </div>
          ) : (
            <div className="plant-grid">
              {visiblePlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
