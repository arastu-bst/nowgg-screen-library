import Link from 'next/link'
import type { Game } from '@/lib/mock-data'

// Vertical-list game row for CollectionPanel, replicated 1:1 from the live now.gg
// "Football Fever" card: 80px row, gap-4; 80px icon (rounded-card 12px, clipped, hover
// zoom — now.gg scales the icon on row hover); title 14/400 white-80 clamped to 2 lines;
// rating = gold star (the now.gg star asset, #ffc32a baked in) + 1-decimal number 10/400
// white on a black-20 rounded-m (8px) pill (pad 4/8, gap 4). On hover the whole row gets a
// soft highlight CONTAINER (white-05, rounded, bleeds 8px into the list padding) — added
// per designer (now.gg has no row-bg hover, only the icon zoom + a play overlay).
export function GameListRow({ game }: { game: Game }) {
  return (
    <Link href={`/play/${game.id}`} className="group relative flex items-center gap-4">
      {/* hover container — sits behind the content, extends into the list padding */}
      <span
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-card bg-white-05 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative size-20 shrink-0 overflow-hidden rounded-card border border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={game.icon}
          alt={game.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="relative flex min-w-0 flex-col items-start gap-2">
        <p className="line-clamp-2 text-sm text-text-secondary">{game.title}</p>
        <span className="inline-flex items-center gap-1 rounded-m bg-black-20 px-2 py-1">
          {/* now.gg star asset (gold #ffc32a baked in) — multi-context exact match */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/now-gg/star-gold.svg" alt="" aria-hidden className="size-3" />
          <span className="text-3xs text-text-primary">{game.rating.toFixed(1)}</span>
        </span>
      </div>
    </Link>
  )
}
