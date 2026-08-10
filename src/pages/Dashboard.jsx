import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Sprout, HeartPulse, Droplets, ListChecks, ArrowRight } from 'lucide-react'
import { usePlants } from '../context/PlantContext.jsx'
import StatCard from '../components/StatCard.jsx'
import CareTask from '../components/CareTask.jsx'
import PlantImage from '../components/PlantImage.jsx'
import EmptyState from '../components/EmptyState.jsx'
import {
  getHealthCategory,
  getWateringStatus,
  getAllCareTasks,
} from '../utils/plantUtils.js'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { plants, waterPlant, updatePlant } = usePlants()

  const stats = useMemo(() => {
    const healthy = plants.filter((p) => getHealthCategory(p.health) === 'healthy').length
    const needsWater = plants.filter((p) => {
      const status = getWateringStatus(p)
      return status === 'today' || status === 'overdue'
    }).length
    const careTasks = getAllCareTasks(plants).filter((t) => t.daysFromToday === 0)
    return {
      total: plants.length,
      healthy,
      needsWater,
      careTasks: careTasks.length,
    }
  }, [plants])

  const todaysTasks = useMemo(() => {
    return getAllCareTasks(plants).filter((t) => t.daysFromToday === 0)
  }, [plants])

  function handleCompleteTask(task, plant) {
    if (task.type === 'water') {
      waterPlant(plant.id)
    } else {
      // "Check sunlight & soil" tasks resolve by nudging health up a touch —
      // a lightweight way to represent "I looked after this plant today".
      updatePlant(plant.id, { health: Math.min(100, plant.health + 5) })
    }
  }

  if (plants.length === 0) {
    return (
      <div className="page">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="page dashboard-page">
      <section className="hero">
        <div className="hero-text">
          <span className="hero-eyebrow">{getGreeting()} 🌱</span>
          <h1>Here's how your little garden is doing.</h1>
          <p>
            {stats.needsWater > 0
              ? `${stats.needsWater} plant${stats.needsWater === 1 ? '' : 's'} would love some water today.`
              : 'Everything is watered and happy right now.'}
          </p>
          <Link to="/plants" className="btn btn-primary">
            <Sprout size={17} strokeWidth={2.2} />
            <span>View My Plants</span>
          </Link>
        </div>
        <div className="hero-art">
          <PlantImage src="/illustrations/garden-hero.png" name="" className="hero-art-image" />
        </div>
      </section>

      <section className="stat-grid">
        <StatCard icon={Sprout} label="Total Plants" value={stats.total} tone="green" />
        <StatCard icon={HeartPulse} label="Healthy" value={stats.healthy} tone="healthy" />
        <StatCard icon={Droplets} label="Need Water" value={stats.needsWater} tone="water" />
        <StatCard icon={ListChecks} label="Care Tasks" value={stats.careTasks} tone="tasks" />
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Today's Care</h2>
          <Link to="/care" className="section-link">
            See full schedule <ArrowRight size={14} strokeWidth={2.2} />
          </Link>
        </div>

        {todaysTasks.length === 0 ? (
          <div className="all-done-card">
            <span>🌿 Nothing urgent today — your garden is all caught up.</span>
          </div>
        ) : (
          <div className="care-task-list">
            {todaysTasks.map((task) => (
              <CareTask
                key={task.id}
                task={task}
                plant={plants.find((p) => p.id === task.plantId)}
                onComplete={handleCompleteTask}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
