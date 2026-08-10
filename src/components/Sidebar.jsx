import { NavLink } from 'react-router-dom'
import { LayoutGrid, Sprout, CalendarDays, Plus, Leaf } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/plants', label: 'My Plants', icon: Sprout },
  { to: '/care', label: 'Care Schedule', icon: CalendarDays },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">
          <Leaf size={20} strokeWidth={2.3} />
        </span>
        <span className="sidebar-brand-text">PlantPal</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' sidebar-link-active' : '')
            }
          >
            <Icon size={18} strokeWidth={2.1} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <NavLink to="/add-plant" className="sidebar-add-btn">
        <Plus size={18} strokeWidth={2.4} />
        <span>Add Plant</span>
      </NavLink>

      <div className="sidebar-footer">
        <p>A little digital garden 🌿</p>
      </div>
    </aside>
  )
}
