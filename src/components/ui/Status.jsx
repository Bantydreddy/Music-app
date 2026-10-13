export default function Status({ loading, error, empty }) {
  if (loading) return <p className="muted pad">Loading...</p>
  if (error) return <p className="muted pad">Could not load songs: {error}</p>
  if (empty) return <p className="muted pad">No songs found. Try another search.</p>
  return null
}
