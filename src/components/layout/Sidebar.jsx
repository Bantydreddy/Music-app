const ITEMS = [
  ['home', 'fa-house', 'Home'],
  ['explore', 'fa-compass', 'Explore'],
  ['library', 'fa-bookmark', 'Library'],
]

export default function Sidebar({ view, collapsed, onNavigate }) {
  return (
    <nav className={'sidebar' + (collapsed ? ' collapsed' : '')} aria-label="Main">
      {ITEMS.map(([id, icon, label]) => (
        <button key={id} className={'nav-item' + (view === id ? ' active' : '')} aria-current={view === id ? 'page' : undefined} onClick={() => onNavigate(id)}>
          <i className={`fas ${icon}`}></i>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
