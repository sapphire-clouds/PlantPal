import { NavLink } from 'react-router-dom'
import { LayoutGrid, Sprout, CalendarDays, Plus } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/plants', label: 'Plants', icon: Sprout },
  { to: '/care', label: 'Care', icon: CalendarDays },
  { to: '/add-plant', label: 'Add', icon: Plus },
]

export default function Navbar() {
  return (
    <nav className="mobile-navbar">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            'mobile-navbar-link' + (isActive ? ' mobile-navbar-link-active' : '')
          }
        >
          <Icon size={20} strokeWidth={2.1} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
