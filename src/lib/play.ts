import { GAMES, POSTERS } from './mock-data'

export type PlayGame = {
  id: string
  title: string
  icon: string
  rating: number
  dev: string
  genre: string
  tag?: string
  description: string
}

// Canonical scraped play page — Little Alchemy 2 (real now.gg asset + metadata).
export const DEFAULT_PLAY: PlayGame = {
  id: 'little-alchemy-2',
  title: 'Little Alchemy 2',
  icon: 'https://cdn.now.gg/assets-opt/_next/image?url=https%3A%2F%2Fcdn.now.gg%2Fassets-opt%2F_next%2Fimage%3Furl%3Dhttps%253A%252F%252Fcdn.now.gg%252Fnow-gg-store%252F501%252Fcom.nowgg.h5.pub501.app52097%252F52097%252Fassets%252Fen-US%252F1779273690%252FChatGPT_Image_May_20%252C_2026%252C_04_10_34_PM.png%26w%3D256%26q%3D80&w=1440&q=70',
  rating: 4.29,
  dev: 'Recloak',
  genre: 'Browser Games',
  tag: 'Puzzle',
  description:
    'Little Alchemy 2 is a browser game developed by Recloak. With now.gg, you can run it instantly in your browser — no download or install required. Start from four base elements (air, earth, fire, water) and combine them to discover hundreds of items, creatures, and surprises. Play at your own pace and enjoy endless crafting fun, anywhere, on any device.',
}

// Resolve a play page from a slug (homepage tiles link to /play/<id>). Falls back to
// Little Alchemy 2. Looked-up games reuse their real icon/title/rating with a templated blurb.
export function findPlayGame(slug: string): PlayGame {
  if (slug === DEFAULT_PLAY.id) return DEFAULT_PLAY
  const g = GAMES.find((x) => x.id === slug)
  if (g) {
    return {
      id: g.id, title: g.title, icon: g.icon, rating: g.rating, dev: 'now.gg', genre: `${g.genre} Games`, tag: g.genre,
      description: `${g.title} is a free online game you can play instantly in your browser on now.gg — no download, no install. Jump in and play ${g.title} solo or with friends, and explore thousands more games across every genre, all in one place.`,
    }
  }
  const p = POSTERS.find((x) => x.id === slug)
  if (p) {
    return {
      id: p.id, title: p.title, icon: p.poster, rating: p.rating, dev: 'now.gg', genre: `${p.genre} Games`, tag: p.genre,
      description: `${p.title} is a free online game you can play instantly in your browser on now.gg — no download, no install. Jump in and explore thousands more games across every genre, all in one place.`,
    }
  }
  return DEFAULT_PLAY
}
