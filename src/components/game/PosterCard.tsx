import Link from 'next/link'
import { RatingBadge } from '@/components/ui/RatingBadge'
import type { Poster } from '@/lib/mock-data'

// Portrait poster card (Popular Games / Top Picks). Real key art (3:4), name BELOW.
// Hover → 1px pink→purple gradient ring + slight image zoom + rating badge.
export function PosterCard({ item }: { item: Poster }) {
  return (
    <Link href={`/play/${item.id}`} className="group flex flex-col gap-2">
      <div className="relative aspect-[3/4]">
        <span className="pointer-events-none absolute -inset-px rounded-[13px] bg-accent-hot opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
        <div className="relative size-full overflow-hidden rounded-card border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.poster} alt={item.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
        <div className="absolute left-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <RatingBadge rating={item.rating} />
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-text-secondary">{item.title}</p>
    </Link>
  )
}
