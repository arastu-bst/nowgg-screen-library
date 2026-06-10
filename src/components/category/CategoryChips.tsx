import { cn } from '@/lib/cn'

// "Explore by Categories" — rounded-rect chips (Figma 5316:8577). 13 categories use
// the REAL now.gg icon SVGs exported from Figma (public/icons/categories/). "Sports
// Games" + "Social Games" aren't in that Figma frame, so they use accent stand-ins
// (flagged) until the real assets are available.
const SLUG: Record<string, string> = {
  'Browser Games': 'browser', 'Casual Games': 'casual', 'Strategy Games': 'strategy',
  'Simulation Games': 'simulation', 'Role Playing Games': 'role-playing', 'Action Games': 'action',
  'Adventure Games': 'adventure', 'Puzzle Games': 'puzzle', 'Arcade Games': 'arcade',
  'Casino Games': 'casino', 'Racing Games': 'racing', 'Card Games': 'card', 'Educational Games': 'educational',
}

function Fallback({ label }: { label: string }) {
  const common = { viewBox: '0 0 24 24', className: 'size-5 shrink-0 text-accent', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  return label === 'Sports Games' ? (
    <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7l3.5 2.5L14 14h-4l-1.5-4.5L12 7z" /></svg>
  ) : (
    <svg {...common}><circle cx="8" cy="9" r="3" /><path d="M3 19a5 5 0 0 1 10 0" /><circle cx="17" cy="7" r="2" /><path d="M15 15a4 4 0 0 1 6 3" /></svg>
  )
}

export function CategoryChips({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((c) => {
        const slug = SLUG[c]
        return (
          <button
            key={c}
            className={cn(
              'flex items-center gap-2.5 rounded-l border border-line bg-fill-subtle px-4 py-2.5',
              'text-sm font-medium text-text-secondary transition-colors',
              'hover:border-line-strong hover:bg-fill-soft hover:text-text-primary',
            )}
          >
            {slug ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/icons/categories/${slug}.svg`} alt="" aria-hidden className="size-5 shrink-0" />
            ) : (
              <Fallback label={c} />
            )}
            {c}
          </button>
        )
      })}
    </div>
  )
}
