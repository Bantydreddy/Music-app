// Row of pill buttons. items = [[label, value], ...]
export default function Chips({ items, onSelect }) {
  return (
    <div className="chips">
      {items.map(([label, value]) => (
        <button key={value} className="chip" onClick={() => onSelect(value)}>{label}</button>
      ))}
    </div>
  )
}
