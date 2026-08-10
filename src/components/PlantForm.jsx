import { useState } from 'react'
import { Sprout } from 'lucide-react'

const SUNLIGHT_OPTIONS = [
  'Bright Direct',
  'Bright Indirect',
  'Full Sun',
  'Low Light',
]

const LOCATION_OPTIONS = [
  'Balcony',
  'Terrace',
  'Living Room',
  'Bedroom',
  'Kitchen Window',
  'Garden',
  'Study Room',
  'Window Sill',
]

const emptyForm = {
  name: '',
  species: '',
  location: LOCATION_OPTIONS[0],
  lastWatered: new Date().toISOString().slice(0, 10),
  wateringFrequency: '',
  sunlight: SUNLIGHT_OPTIONS[0],
  health: 90,
  notes: '',
  image: '',
}

/**
 * Reused for both Add Plant and Edit Plant. Pass `initialValues` to
 * pre-fill the form for editing; omit it for a blank Add Plant form.
 */
export default function PlantForm({ initialValues, onSubmit, submitLabel = 'Add Plant' }) {
  const [form, setForm] = useState({ ...emptyForm, ...initialValues })
  const [errors, setErrors] = useState({})

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Plant name is required.'
    if (!form.species.trim()) next.species = 'Species is required.'
    if (form.wateringFrequency === '' || form.wateringFrequency === null) {
      next.wateringFrequency = 'Watering frequency is required.'
    } else if (isNaN(Number(form.wateringFrequency)) || Number(form.wateringFrequency) <= 0) {
      next.wateringFrequency = 'Enter a valid number of days.'
    }
    if (!form.lastWatered) {
      next.lastWatered = 'A valid date is required.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const guessedImage =
      form.image?.trim() ||
      `/illustrations/${form.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}.png`

    onSubmit({
      ...form,
      name: form.name.trim(),
      species: form.species.trim(),
      wateringFrequency: Number(form.wateringFrequency),
      health: Number(form.health),
      notes: form.notes.trim(),
      image: guessedImage,
    })
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit} noValidate>
      <div className="plant-form-grid">
        <div className="form-field">
          <label htmlFor="name">Plant Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="e.g. Tulsi"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="species">Species</label>
          <input
            id="species"
            type="text"
            value={form.species}
            onChange={(e) => update('species', e.target.value)}
            placeholder="e.g. Ocimum tenuiflorum"
          />
          {errors.species && <span className="form-error">{errors.species}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
          >
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="sunlight">Sunlight Requirement</label>
          <select
            id="sunlight"
            value={form.sunlight}
            onChange={(e) => update('sunlight', e.target.value)}
          >
            {SUNLIGHT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="lastWatered">Last Watered</label>
          <input
            id="lastWatered"
            type="date"
            value={form.lastWatered}
            onChange={(e) => update('lastWatered', e.target.value)}
          />
          {errors.lastWatered && <span className="form-error">{errors.lastWatered}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="wateringFrequency">Watering Frequency (days)</label>
          <input
            id="wateringFrequency"
            type="number"
            min="1"
            value={form.wateringFrequency}
            onChange={(e) => update('wateringFrequency', e.target.value)}
            placeholder="e.g. 3"
          />
          {errors.wateringFrequency && (
            <span className="form-error">{errors.wateringFrequency}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="health">Health ({form.health}%)</label>
          <input
            id="health"
            type="range"
            min="0"
            max="100"
            value={form.health}
            onChange={(e) => update('health', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="image">
            Illustration filename <span className="form-hint">(optional)</span>
          </label>
          <input
            id="image"
            type="text"
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="/illustrations/your-plant.png"
          />
        </div>

        <div className="form-field form-field-wide">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            rows="3"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="How is this plant doing?"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-wide">
        <Sprout size={17} strokeWidth={2.2} />
        <span>{submitLabel}</span>
      </button>
    </form>
  )
}
