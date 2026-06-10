import { GameIconTile } from './GameIconTile'
import type { Game } from '@/lib/mock-data'

// Responsive icon-tile grid. Extracted now.gg grid vars: 9 tiles/row desktop,
// 3/row mobile (token grid-cols-tiles / grid-cols-tiles-mobile), 8px item margin.
export function IconTileGrid({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-tiles-mobile gap-x-3 gap-y-4 md:grid-cols-tiles">
      {games.map((g) => (
        <GameIconTile key={g.id} game={g} />
      ))}
    </div>
  )
}
