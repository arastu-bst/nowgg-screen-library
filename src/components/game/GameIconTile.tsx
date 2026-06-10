import Link from 'next/link'
import { RatingBadge } from '@/components/ui/RatingBadge'
import type { Game } from '@/lib/mock-data'

// Square game-icon tile + name. Hover → 1px pink→purple gradient ring + slight
// image zoom (within the clipped frame) + rating badge (top-left).
export function GameIconTile({ game }: { game: Game }) {
  return (
    <Link href={`/play/${game.id}`} className="group flex flex-col gap-1.5">
      <div className="relative aspect-square">
        <span className="pointer-events-none absolute -inset-px rounded-[9px] bg-accent-hot opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
        <div className="relative size-full overflow-hidden rounded-tile border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={game.icon} alt={game.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
        <div className="absolute left-1.5 top-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <RatingBadge rating={game.rating} />
        </div>
      </div>
      <p className="line-clamp-1 text-2xs font-medium text-text-secondary md:text-xs">{game.title}</p>
    </Link>
  )
}
