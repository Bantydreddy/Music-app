import { MOODS } from '../config'

export default function Explore({ onSearch }) {
  return (
    <div className="home">
      <h2 className="page-title flush">Moods and genres</h2>
      <div className="tiles">
        {MOODS.map(([label, term], i) => (
          <button key={term} className="tile" style={{ '--h': i * 36 }} onClick={() => onSearch(term)}>{label}</button>
        ))}
      </div>
    </div>
  )
}
