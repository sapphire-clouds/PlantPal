import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Droplets,
  Sun,
  MapPin,
  Calendar,
  Pencil,
  Trash2,
  Save,
} from 'lucide-react'
import { usePlants } from '../context/PlantContext.jsx'
import PlantImage from '../components/PlantImage.jsx'
import HealthBar from '../components/HealthBar.jsx'
import PlantForm from '../components/PlantForm.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import EmptyState from '../components/EmptyState.jsx'
import {
  getWateringStatus,
  getWateringStatusLabel,
  formatDate,
} from '../utils/plantUtils.js'

export default function PlantDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPlant, updatePlant, deletePlant, waterPlant, updateNotes } = usePlants()
  const plant = getPlant(id)

  const [isEditing, setIsEditing] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [notesDraft, setNotesDraft] = useState(plant?.notes || '')
  const [notesSaved, setNotesSaved] = useState(false)
  const [justWatered, setJustWatered] = useState(false)

  if (!plant) {
    return (
      <div className="page">
        <EmptyState
          title="Plant not found"
          message="This plant may have been removed. Head back to your garden to see what's growing."
        />
      </div>
    )
  }

  const wateringStatus = getWateringStatus(plant)
  const wateringLabel = getWateringStatusLabel(plant)

  function handleWater() {
    waterPlant(plant.id)
    setJustWatered(true)
    setTimeout(() => setJustWatered(false), 2200)
  }

  function handleSaveNotes() {
    updateNotes(plant.id, notesDraft)
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 1800)
  }

  function handleEditSubmit(updatedData) {
    updatePlant(plant.id, updatedData)
    setIsEditing(false)
  }

  function handleDeleteConfirm() {
    deletePlant(plant.id)
    navigate('/plants')
  }

  if (isEditing) {
    return (
      <div className="page">
        <button type="button" className="back-link" onClick={() => setIsEditing(false)}>
          <ArrowLeft size={16} strokeWidth={2.2} />
          <span>Cancel editing</span>
        </button>

        <div className="page-header">
          <h1>Edit {plant.name}</h1>
        </div>

        <div className="form-card">
          <PlantForm
            initialValues={plant}
            onSubmit={handleEditSubmit}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page details-page">
      <Link to="/plants" className="back-link">
        <ArrowLeft size={16} strokeWidth={2.2} />
        <span>Back to My Plants</span>
      </Link>

      <div className="details-hero">
        <PlantImage
          src={plant.image}
          name={plant.name}
          className="details-hero-image"
        />

        <div className="details-hero-info">
          <h1>{plant.name}</h1>
          <p className="details-species">{plant.species}</p>
          <HealthBar health={plant.health} size="lg" />

          <div className="details-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setIsEditing(true)}>
              <Pencil size={16} strokeWidth={2.2} />
              <span>Edit</span>
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-danger-ghost"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 size={16} strokeWidth={2.2} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-info-card">
          <div className="details-info-item">
            <MapPin size={16} strokeWidth={2.1} />
            <div>
              <span className="details-info-label">Location</span>
              <span className="details-info-value">{plant.location}</span>
            </div>
          </div>
          <div className="details-info-item">
            <Sun size={16} strokeWidth={2.1} />
            <div>
              <span className="details-info-label">Sunlight</span>
              <span className="details-info-value">{plant.sunlight}</span>
            </div>
          </div>
          <div className="details-info-item">
            <Droplets size={16} strokeWidth={2.1} />
            <div>
              <span className="details-info-label">Watering</span>
              <span className="details-info-value">
                Every {plant.wateringFrequency} day{plant.wateringFrequency === 1 ? '' : 's'}
              </span>
            </div>
          </div>
          <div className="details-info-item">
            <Calendar size={16} strokeWidth={2.1} />
            <div>
              <span className="details-info-label">Last Watered</span>
              <span className="details-info-value">{formatDate(plant.lastWatered)}</span>
            </div>
          </div>
        </div>

        <div className="details-watering-card">
          <div className="details-watering-header">
            <Droplets size={20} strokeWidth={2.1} />
            <h3>Watering</h3>
          </div>
          <p className={`details-watering-status details-watering-status-${wateringStatus}`}>
            Next watering: {wateringLabel}
          </p>
          <button type="button" className="btn btn-primary btn-wide" onClick={handleWater}>
            <Droplets size={16} strokeWidth={2.2} />
            <span>Mark as Watered</span>
          </button>
          {justWatered && <span className="inline-success">Watered! Your plant thanks you. 🌿</span>}
        </div>
      </div>

      <div className="details-notes-card">
        <h3>Plant Notes</h3>
        <textarea
          rows="4"
          value={notesDraft}
          onChange={(e) => setNotesDraft(e.target.value)}
          placeholder="How is this plant doing?"
        />
        <div className="details-notes-actions">
          <button type="button" className="btn btn-primary" onClick={handleSaveNotes}>
            <Save size={15} strokeWidth={2.2} />
            <span>Save Notes</span>
          </button>
          {notesSaved && <span className="inline-success">Saved</span>}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Are you sure you want to remove this plant?"
        message={`${plant.name} will be permanently removed from your garden.`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
