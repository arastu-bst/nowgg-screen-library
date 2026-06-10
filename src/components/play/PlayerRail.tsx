import type { Game } from '@/lib/mock-data'

// The player's recent-games strip — a narrow vertical column of game icons between the
// left ad column and the canvas. Live now.gg (measured): 70×70 icons, 4px radius, 12px
// gap. Hover = crisp 1px accent ring (BEHIND the icon, not covering it) + image zoom +
// a dark tooltip with the game name below. No inner scroll — keeps the tooltip from
// being clipped (the trimmed list fits the player hero).
export function PlayerRail({ games }: { games: Game[] }) {
  return (
    <aside className="hidden w-rail shrink-0 flex-col gap-3 lg:flex">
      {games.map((g) => (
        <div key={g.id} className="group relative shrink-0">
          <a href={`/play/${g.id}`} className="relative block">
            {/* 1px accent ring — sits BEHIND the icon (no z-index) so only the edge shows */}
            <span className="pointer-events-none absolute -inset-px rounded-[5px] bg-accent-hot opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
            <span className="relative block overflow-hidden rounded-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.icon}
                alt={g.title}
                loading="lazy"
                className="size-rail object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </span>
          </a>
          {/* hover tooltip — dark pill, game name, wraps long titles */}
          <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[180px] -translate-x-1/2 rounded-l bg-black-80 px-3 py-2 text-center text-2xs font-medium text-white opacity-0 shadow-soft backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            {g.title}
          </span>
        </div>
      ))}
    </aside>
  )
}
