import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { Game } from '@/lib/mock-data'
import { GameListRow } from './GameListRow'

// Homepage collection card, replicated 1:1 from the live now.gg "Football Fever" panel:
// a self-contained bordered surface (#111 surface-raised + a top magenta glow, 0.8px
// now.gg-pink hairline, radius-xxl 16px) that owns its OWN chrome — unlike the full-width
// page Section. Header = 50px tall: title 16/700 white + "View all" 12/400 white-70 + a
// 12px chevron (pad left-16 right-12, justify-between). Body = a vertical list of 80px
// GameListRows, gap-4, padded 16. Like live now.gg, the LIST is height-capped to ~the
// viewport (xl rail only) and scrolls internally — the header stays put. Below xl the
// panel rides inline in the page flow, so no cap (the page scrolls instead).
export function CollectionPanel({
  title,
  href,
  games,
  className,
}: {
  title: string
  href: string
  games: Game[]
  className?: string
}) {
  return (
    <section className={cn('overflow-hidden rounded-xxl border-hair border-accent bg-collection-glow', className)}>
      <header className="flex h-[50px] items-center justify-between gap-4 border-b-hair border-line pl-4 pr-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-text-primary">
          <span>{title}</span>
          {/* animated AI sparkle — the now.gg ai-star.gif (blinking stars), 20px after the title */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/now-gg/ai-star.gif" alt="" aria-hidden className="size-5 shrink-0" />
        </h2>
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 text-2xs font-normal text-text-tertiary transition-colors hover:text-text-primary"
        >
          View all
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/now-gg/arrow-stroke-right.svg" alt="" aria-hidden className="size-3" />
        </Link>
      </header>
      <div className="scroll-thin flex flex-col gap-4 p-4 xl:max-h-[calc(100vh-156px)] xl:overflow-y-auto">
        {games.map((g) => (
          <GameListRow key={g.id} game={g} />
        ))}
      </div>
    </section>
  )
}
