// Small reusable wrapper around localStorage so the rest of the app
// never has to think about JSON.stringify/parse or missing keys.

const STORAGE_KEY = 'plantpal-plants'

export function loadPlants() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch (err) {
    console.warn('PlantPal: could not read saved garden, starting fresh.', err)
    return null
  }
}

export function savePlants(plants) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants))
    return true
  } catch (err) {
    console.warn('PlantPal: could not save garden to this browser.', err)
    return false
  }
}

export function clearPlants() {
  localStorage.removeItem(STORAGE_KEY)
}
