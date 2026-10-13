import { useState } from 'react'
import { LibraryProvider } from './context/LibraryContext'
import { PlayerProvider } from './context/PlayerContext'
import { useDebounce } from './hooks/useDebounce'
import { usePersistentState } from './hooks/usePersistentState'
import { useResizable } from './hooks/useResizable'
import TopBar from './components/layout/TopBar'
import Sidebar from './components/layout/Sidebar'
import PlayerBar from './components/layout/PlayerBar'
import QueuePanel from './components/layout/QueuePanel'
import TrackList from './components/TrackList'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Library from './pages/Library'

export default function App() {
  const [view, setView] = useState('home') // home | explore | library | search
  const [query, setQuery] = useState('')
  const term = useDebounce(query.trim())

  // These three are remembered between visits
  const [collapsed, setCollapsed] = usePersistentState('song@:sidebar-collapsed', false)
  const [queueOpen, setQueueOpen] = usePersistentState('song@:queue-open', false)
  const [queueWidth, startResize] = useResizable('song@:queue-width', 360, 280, 560)

  const navigate = (v) => { setQuery(''); setView(v) }
  const search = (text) => { setQuery(text); setView('search') }
  const onQuery = (text) => { setQuery(text); setView(text ? 'search' : 'home') }

  const pages = {
    home: <Home onSearch={search} />,
    explore: <Explore onSearch={search} />,
    library: <Library />,
    search: term ? <TrackList key={term} search={term} title={`Results for "${term}"`} /> : null,
  }

  return (
    <LibraryProvider>
      <PlayerProvider>
        <div className="app" style={{ '--side': collapsed ? '72px' : '240px', '--queue': queueOpen ? `${queueWidth}px` : '0px' }}>
          <TopBar query={query} onQuery={onQuery} onToggleSidebar={() => setCollapsed(!collapsed)} onHome={() => navigate('home')} />
          <Sidebar view={view} collapsed={collapsed} onNavigate={navigate} />
          <main className={'main' + (view === 'home' || view === 'explore' ? '' : ' fill')}>{pages[view]}</main>
          {queueOpen && <QueuePanel onResize={startResize} onClose={() => setQueueOpen(false)} />}
          <PlayerBar queueOpen={queueOpen} onToggleQueue={() => setQueueOpen(!queueOpen)} />
        </div>
      </PlayerProvider>
    </LibraryProvider>
  )
}
