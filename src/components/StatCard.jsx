export default function StatCard({ icon: Icon, label, value, tone = 'default' }) {
  return (
    <div className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-icon">
        <Icon size={22} strokeWidth={2} />
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  )
}
