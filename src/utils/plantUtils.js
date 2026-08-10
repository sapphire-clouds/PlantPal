// Pure helper functions shared across pages/components.
// Nothing here touches React state — everything is derived from
// plain plant data + "today", so it's easy to reason about and test.

const MS_PER_DAY = 1000 * 60 * 60 * 24

/** Normalizes a Date (or date string) to midnight, ignoring time-of-day. */
function toMidnight(dateInput) {
  const d = new Date(dateInput)
  d.setHours(0, 0, 0, 0)
  return d
}

export function todayISO() {
  return toMidnight(new Date()).toISOString().slice(0, 10)
}

/** Returns the next watering date as a Date object at midnight. */
export function getNextWateringDate(plant) {
  const last = toMidnight(plant.lastWatered)
  return new Date(last.getTime() + plant.wateringFrequency * MS_PER_DAY)
}

/** Days between today and the next watering date (negative = overdue). */
export function getDaysUntilWatering(plant) {
  const today = toMidnight(new Date())
  const next = getNextWateringDate(plant)
  return Math.round((next.getTime() - today.getTime()) / MS_PER_DAY)
}

/**
 * Returns one of: 'overdue' | 'today' | 'soon' | 'ok'
 * 'soon' = due within the next 2 days.
 */
export function getWateringStatus(plant) {
  const days = getDaysUntilWatering(plant)
  if (days < 0) return 'overdue'
  if (days === 0) return 'today'
  if (days <= 2) return 'soon'
  return 'ok'
}

export function getWateringStatusLabel(plant) {
  const status = getWateringStatus(plant)
  const days = getDaysUntilWatering(plant)
  switch (status) {
    case 'overdue':
      return `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'}`
    case 'today':
      return 'Water today'
    case 'soon':
      return `Due in ${days} day${days === 1 ? '' : 's'}`
    default:
      return `Not due for ${days} days`
  }
}

/** 'healthy' | 'attention' | 'critical' based on 0-100 health score. */
export function getHealthCategory(health) {
  if (health >= 80) return 'healthy'
  if (health >= 50) return 'attention'
  return 'critical'
}

export const HEALTH_LABELS = {
  healthy: 'Healthy',
  attention: 'Needs Attention',
  critical: 'Critical',
}

export function formatDate(dateInput) {
  const d = new Date(dateInput)
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(dateInput) {
  const d = new Date(dateInput)
  return d.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Builds a friendly "day group" label for the Care Schedule page:
 * Today / Tomorrow / a formatted date.
 */
export function getDayGroupLabel(daysFromToday) {
  if (daysFromToday <= 0) return 'Today'
  if (daysFromToday === 1) return 'Tomorrow'
  const d = new Date()
  d.setDate(d.getDate() + daysFromToday)
  return d.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })
}

/**
 * Generates the list of care tasks for a plant. A plant can produce a
 * watering task (if due soon/today/overdue) and a sunlight-check task
 * for plants that are struggling despite not being due for water yet.
 */
export function getCareTasksForPlant(plant) {
  const tasks = []
  const wateringStatus = getWateringStatus(plant)

  if (wateringStatus === 'overdue' || wateringStatus === 'today') {
    tasks.push({
      id: `${plant.id}-water`,
      plantId: plant.id,
      type: 'water',
      label: wateringStatus === 'overdue' ? 'Water — overdue' : 'Water today',
      daysFromToday: 0,
    })
  } else if (wateringStatus === 'soon') {
    tasks.push({
      id: `${plant.id}-water`,
      plantId: plant.id,
      type: 'water',
      label: 'Water soon',
      daysFromToday: getDaysUntilWatering(plant),
    })
  }

  if (getHealthCategory(plant.health) !== 'healthy') {
    tasks.push({
      id: `${plant.id}-check`,
      plantId: plant.id,
      type: 'check',
      label: 'Check sunlight & soil',
      daysFromToday: 0,
    })
  }

  return tasks
}

/** All care tasks across the whole garden, used by Dashboard + Care Schedule. */
export function getAllCareTasks(plants) {
  return plants.flatMap((plant) => getCareTasksForPlant(plant))
}
