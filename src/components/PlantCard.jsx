import { Link } from 'react-router-dom'
import { Droplets, MapPin, ArrowRight } from 'lucide-react'
import PlantImage from './PlantImage.jsx'
import HealthBar from './HealthBar.jsx'
import { getWateringStatus, getWateringStatusLabel } from '../utils/plantUtils.js'

export default function PlantCard({ plant }) {
  const wateringStatus = getWateringStatus(plant)
  const wateringLabel = getWateringStatusLabel(plant)

  return (
    <div className="plant-card">
      <Link to={`/plants/${plant.id}`} className="plant-card-image-link">
        <PlantImage
          src={plant.image}
          name={plant.name}
          className="plant-card-image"
        />
      </Link>

      <div className="plant-card-body">
        <div className="plant-card-heading">
          <h3>{plant.name}</h3>
          <span className="plant-card-species">{plant.species}</span>
        </div>

        <div className="plant-card-location">
          <MapPin size={14} strokeWidth={2} />
          <span>{plant.location}</span>
        </div>

        <HealthBar health={plant.health} size="sm" />

        <div className={`plant-card-watering plant-card-watering-${wateringStatus}`}>
          <Droplets size={14} strokeWidth={2.1} />
          <span>{wateringLabel}</span>
        </div>

        <Link to={`/plants/${plant.id}`} className="plant-card-link">
          View Plant <ArrowRight size={15} strokeWidth={2.2} />
        </Link>
      </div>
    </div>
  )
}
