import { POSTERS } from './mock-data'

export type Featured = { id: string; title: string; poster: string; dev: string }

// The unlabeled "promoted games" band on the live play page (between Popular Games
// and Video Clips): 6 portrait cards, each with the game name + its developer. Real
// now.gg game-tile art (reused from POSTERS) + the real publisher names off the live page.
const DEVS: Record<string, string> = {
  'smash-karts': 'TALL TEAM',
  'gacha-life-2': 'Lunime',
  'armedforces-io': 'JulGames',
  'five-nights-at-freddy-s-2': 'Scott Cawthon',
  'swords-and-souls': 'Soul Studio',
  'linky-chat-with-characters-ai': 'Skywork AI Pte. Ltd.',
}

export const FEATURED: Featured[] = Object.keys(DEVS)
  .map((id) => {
    const p = POSTERS.find((x) => x.id === id)
    return p ? { id, title: p.title, poster: p.poster, dev: DEVS[id] } : null
  })
  .filter(Boolean) as Featured[]
