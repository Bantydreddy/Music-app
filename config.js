// Everything you are likely to edit lives here. Add a shelf by adding one line.
export const USER_NAME = 'Banty Dreddy'

// [label, search term]
export const MOODS = [
  ['Work out', 'workout'], ['Relax', 'chill'], ['Energise', 'upbeat'], ['Party', 'party'],
  ['Feel good', 'feel good'], ['Sad', 'sad songs'], ['Romance', 'love songs'], ['Commute', 'pop hits'],
  ['Focus', 'instrumental focus'], ['Sleep', 'sleep'],
]

// variant 'rows' = columns of 4 song rows, 'cards' = square covers
export const SHELVES = [
  { id: 'quick', title: 'Quick picks', search: 'dancehall', variant: 'rows', limit: 24 },
  { id: 'reggae', title: 'Reggae essentials', search: 'reggae', variant: 'cards', limit: 20 },
  { id: 'konpa', title: 'Konpa', search: 'konpa', variant: 'cards', limit: 20 },
  { id: 'afro', title: 'Afrobeats', search: 'afrobeats', variant: 'cards', limit: 20 },
  { id: 'hiphop', title: 'Hip hop', search: 'hip hop', variant: 'cards', limit: 20 },
  { id: 'rnb', title: 'R&B', search: 'r&b', variant: 'cards', limit: 20 },
]
