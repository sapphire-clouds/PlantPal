import { useMemo } from 'react'
import { usePlants } from '../context/PlantContext.jsx'
import CareTask from '../components/CareTask.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { getAllCareTasks, getDayGroupLabel } from '../utils/plantUtils.js'

export default function CareSchedule() {
  const { plants, waterPlant, updatePlant } = usePlants()

  const groupedTasks = useMemo(() => {
    const tasks = getAllCareTasks(plants)
    const groups = new Map()

    tasks.forEach((task) => {
      const key = task.daysFromToday
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(task)
    })

    return [...groups.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([daysFromToday, groupTasks]) => ({
        daysFromToday,
        label: getDayGroupLabel(daysFromToday),
        tasks: groupTasks,
      }))
  }, [plants])

  function handleCompleteTask(task, plant) {
    if (task.type === 'water') {
      waterPlant(plant.id)
    } else {
      updatePlant(plant.id, { health: Math.min(100, plant.health + 5) })
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Care Schedule</h1>
          <p className="page-subtitle">Upcoming tasks across your whole garden.</p>
        </div>
      </div>

      {groupedTasks.length === 0 ? (
        <EmptyState
          title="Nothing scheduled"
          message="Every plant is watered and thriving. Check back soon."
          showAction={false}
        />
      ) : (
        <div className="care-schedule">
          {groupedTasks.map((group) => (
            <section key={group.daysFromToday} className="care-schedule-group">
              <h2 className="care-schedule-day">{group.label.toUpperCase()}</h2>
              <div className="care-task-list">
                {group.tasks.map((task) => (
                  <CareTask
                    key={task.id}
                    task={task}
                    plant={plants.find((p) => p.id === task.plantId)}
                    onComplete={handleCompleteTask}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
