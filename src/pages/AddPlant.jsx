import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { usePlants } from '../context/PlantContext.jsx'
import PlantForm from '../components/PlantForm.jsx'

export default function AddPlant() {
  const { addPlant } = usePlants()
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)

  function handleSubmit(plantData) {
    addPlant(plantData)
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/plants')
    }, 900)
  }

  return (
    <div className="page">
      <Link to="/plants" className="back-link">
        <ArrowLeft size={16} strokeWidth={2.2} />
        <span>Back to My Plants</span>
      </Link>

      <div className="page-header">
        <div>
          <h1>Add a New Plant</h1>
          <p className="page-subtitle">Welcome a new little friend to your garden.</p>
        </div>
      </div>

      {showSuccess && (
        <div className="success-banner">
          <CheckCircle2 size={18} strokeWidth={2.2} />
          <span>Plant added! Taking you to My Plants...</span>
        </div>
      )}

      <div className="form-card">
        <PlantForm onSubmit={handleSubmit} submitLabel="Add Plant" />
      </div>
    </div>
  )
}
