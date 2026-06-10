import Link from 'next/link'
import type { Featured } from '@/lib/featured'

// Unlabeled "promoted games" band from the live play page — a FULL-WIDTH white-10
// band that sits between Popular Games and Video Clips (no heading). 6 portrait (4:5)
// poster cards, each with the game name (12/400/white-70) above the developer
// (14/500/white) — the developer is the emphasized line, matching the live. Hover =
// 1px accent-hot ring + image zoom (same treatment as PosterCard). Band padding 48/32.
export function FeaturedBand({ games }: { games: Featured[] }) {
  return (
    <section className="bg-white-10">
      <div className="mx-auto grid max-w-content grid-cols-3 gap-x-5 gap-y-7 px-8 py-12 sm:grid-cols-4 lg:grid-cols-6">
        {games.map((g) => (
          <Link key={g.id} href={`/play/${g.id}`} className="group flex flex-col gap-2">
            <div className="relative aspect-[4/5]">
              <span className="pointer-events-none absolute -inset-px rounded-[13px] bg-accent-hot opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
              <div className="relative size-full overflow-hidden rounded-card border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.poster} alt={g.title} loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
            </div>
            <div>
              <p className="line-clamp-2 text-2xs leading-tight text-text-primary/70">{g.title}</p>
              <p className="mt-0.5 truncate text-sm font-medium text-text-primary">{g.dev}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
