import Logo from '../ui/Logo'
import { USER_NAME } from '../../config'

export default function TopBar({ query, onQuery, onToggleSidebar, onHome }) {
  return (
    <header className="topbar">
      <button className="icon-btn menu-btn" aria-label="Toggle menu" onClick={onToggleSidebar}><i className="fas fa-bars"></i></button>
      <button className="brand" aria-label="song@ home" onClick={onHome}><Logo /></button>
      <label className="searchbox">
        <i className="fas fa-magnifying-glass"></i>
        <input type="search" placeholder="Search songs, albums, artists" aria-label="Search" value={query} onChange={(e) => onQuery(e.target.value)} />
      </label>
      <div className="avatar" aria-hidden="true">{USER_NAME[0]}</div>
    </header>
  )
}
