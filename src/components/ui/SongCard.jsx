import { usePlayer } from '../../context/PlayerContext'

export default function SongCard({ track, onPlay }) {
  const { track: current, playing } = usePlayer()
  const active = current?.id === track.id
  return (
    <button className="card" onClick={onPlay}>
      <div className="art">
        <img src={track.cover} alt="" width="176" height="176" loading="lazy" />
        <span className="play"><i className={`fas ${active && playing ? 'fa-pause' : 'fa-play'}`}></i></span>
      </div>
      <strong>{track.title}</strong>
      <small>{track.artist}</small>
    </button>
  )
}
