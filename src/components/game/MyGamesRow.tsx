import { Icon } from '@/components/ui/Icon'
import { GAMES } from '@/lib/mock-data'

// "My Games" row (Figma 5315:8482) — recently-played strip under the header.
// Hover → 1px gradient ring + slight image zoom + dark tooltip pill below.
export function MyGamesRow() {
  const recent = GAMES.slice(0, 12)
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 items-center gap-2">
        <Icon name="mygames" className="size-5 text-accent" />
        <span className="text-sm font-bold leading-[1.05] text-text-primary">
          My<br />Games
        </span>
      </div>
      <span className="h-12 w-px shrink-0 bg-line" aria-hidden />
      <div className="scroll-hide -mb-9 flex items-center gap-4 overflow-x-auto pb-9">
        {recent.map((g) => (
          <div key={g.id} className="group relative shrink-0">
            <a href={`/play/${g.id}`} className="relative block">
              <span className="pointer-events-none absolute -inset-px rounded-full bg-accent-hot opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
              <div className="relative size-12 overflow-hidden rounded-full border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.icon} alt={g.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </div>
            </a>
            <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black-80 px-3 py-1.5 text-2xs font-medium text-white opacity-0 shadow-soft backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              {g.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
