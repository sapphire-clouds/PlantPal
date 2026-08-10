import { createContext, useContext, useEffect, useState } from 'react'
import samplePlants from '../data/samplePlants.js'
import { loadPlants, savePlants } from '../utils/storage.js'
import { todayISO } from '../utils/plantUtils.js'

const PlantContext = createContext(null)

export function PlantProvider({ children }) {
  // Lazy init: read from localStorage once, falling back to sample data.
  const [plants, setPlants] = useState(() => {
    const saved = loadPlants()
    return saved && saved.length > 0 ? saved : samplePlants
  })

  // Persist to localStorage any time the garden changes.
  useEffect(() => {
    savePlants(plants)
  }, [plants])

  function addPlant(plantData) {
    const newPlant = {
      ...plantData,
      id: Date.now(),
    }
    setPlants((prev) => [...prev, newPlant])
    return newPlant
  }

  function updatePlant(id, updates) {
    setPlants((prev) =>
      prev.map((plant) => (plant.id === id ? { ...plant, ...updates } : plant))
    )
  }

  function deletePlant(id) {
    setPlants((prev) => prev.filter((plant) => plant.id !== id))
  }

  function waterPlant(id) {
    updatePlant(id, { lastWatered: todayISO() })
  }

  function getPlant(id) {
    return plants.find((plant) => String(plant.id) === String(id))
  }

  function updateNotes(id, notes) {
    updatePlant(id, { notes })
  }

  const value = {
    plants,
    addPlant,
    updatePlant,
    deletePlant,
    waterPlant,
    getPlant,
    updateNotes,
  }

  return <PlantContext.Provider value={value}>{children}</PlantContext.Provider>
}

export function usePlants() {
  const ctx = useContext(PlantContext)
  if (!ctx) {
    throw new Error('usePlants must be used within a PlantProvider')
  }
  return ctx
}
