import { getHealthCategory, HEALTH_LABELS } from '../utils/plantUtils.js'

export default function HealthBar({ health, showLabel = true, size = 'md' }) {
  const category = getHealthCategory(health)

  return (
    <div className={`health-bar health-bar-${size}`}>
      {showLabel && (
        <div className="health-bar-header">
          <span className="health-bar-title">Health</span>
          <span className={`health-bar-pct health-bar-pct-${category}`}>{health}%</span>
        </div>
      )}
      <div className="health-bar-track">
        <div
          className={`health-bar-fill health-bar-fill-${category}`}
          style={{ width: `${health}%` }}
        />
      </div>
      {showLabel && size !== 'sm' && (
        <span className={`health-badge health-badge-${category}`}>
          {HEALTH_LABELS[category]}
        </span>
      )}
    </div>
  )
}
