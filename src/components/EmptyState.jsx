import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import PlantImage from './PlantImage.jsx'

export default function EmptyState({
  title = 'Your garden is empty',
  message = 'Add your first little plant friend and start growing your collection.',
  image = '/illustrations/empty-pot.png',
  showAction = true,
}) {
  return (
    <div className="empty-state">
      <PlantImage src={image} name="" className="empty-state-image" />
      <h2>{title}</h2>
      <p>{message}</p>
      {showAction && (
        <Link to="/add-plant" className="btn btn-primary">
          <Plus size={17} strokeWidth={2.3} />
          <span>Add Plant</span>
        </Link>
      )}
    </div>
  )
}
