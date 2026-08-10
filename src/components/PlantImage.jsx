import { useState } from 'react'
import { Sprout } from 'lucide-react'

/**
 * Renders a plant's illustration, falling back to a soft botanical
 * placeholder (icon + name) if the image is missing or fails to load.
 * This means the app works perfectly before any PNGs are added to
 * public/illustrations, and pictures appear automatically once they are.
 */
export default function PlantImage({ src, alt, name, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`plant-image plant-image-fallback ${className}`}>
        <div className="plant-image-fallback-icon">
          <Sprout size={32} strokeWidth={1.8} />
        </div>
        {name && <span className="plant-image-fallback-name">{name}</span>}
      </div>
    )
  }

  return (
    <div className={`plant-image ${className}`}>
      <img
        src={src}
        alt={alt || name || 'Plant illustration'}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
