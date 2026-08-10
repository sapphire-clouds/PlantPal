import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search plants...' }) {
  return (
    <div className="search-bar">
      <Search size={17} strokeWidth={2.1} className="search-bar-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search plants"
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={15} strokeWidth={2.2} />
        </button>
      )}
    </div>
  )
}
