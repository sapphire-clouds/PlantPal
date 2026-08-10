import { Link } from 'react-router-dom'
import { Droplets, Sun, Check } from 'lucide-react'

export default function CareTask({ task, plant, onComplete }) {
  if (!plant) return null

  const Icon = task.type === 'water' ? Droplets : Sun

  return (
    <div className="care-task">
      <div className={`care-task-icon care-task-icon-${task.type}`}>
        <Icon size={18} strokeWidth={2.1} />
      </div>

      <div className="care-task-body">
        <Link to={`/plants/${plant.id}`} className="care-task-name">
          {plant.name}
        </Link>
        <span className="care-task-label">{task.label}</span>
      </div>

      <button
        type="button"
        className="care-task-done-btn"
        onClick={() => onComplete(task, plant)}
      >
        <Check size={15} strokeWidth={2.4} />
        <span>Mark as Done</span>
      </button>
    </div>
  )
}
