# song@

A music app UI built in React + Vite as a UI-engineering exercise. It plays real 30-second previews from the free iTunes Search API (no key needed).

## Features

- App shell: top bar, collapsible sidebar, main pane, resizable "Up next" queue, player bar
- Reusable building blocks: `Shelf`, `SongCard`, `SongRow`, `Chips`, `VirtualList`
- Virtualised lists, so thousands of songs scroll smoothly
- Shelves load lazily as you scroll
- Player: seek, volume, repeat, shuffle, queue
- Liked songs saved in the browser
- Remembers sidebar state, queue width and volume
- Responsive: sidebar becomes a bottom tab bar on phones

## Structure

```
src/
  config.js                 moods and home shelves (add a shelf with one line)
  api/music.js              the only file that talks to the API
  hooks/                    useTracks, useDebounce, useInView, usePersistentState, useResizable
  context/                  PlayerContext (audio, queue), LibraryContext (likes)
  components/layout/        TopBar, Sidebar, PlayerBar, QueuePanel
  components/ui/            Shelf, SongCard, SongRow, Chips, VirtualList, Logo, Status
  pages/                    Home, Explore, Library
```

## Run it

```bash
npm install
npm run dev
```
