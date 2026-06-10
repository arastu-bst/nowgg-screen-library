import Link from 'next/link'
import { ChevronRight } from '@/components/ui/icons'

export type Crumb = { label: string; href?: string }

// Breadcrumb trail: Home › Games › <genre> › <game>. Trail items are white-90 +
// semibold (links); the last item is the current page — dimmed (white-50), not a
// link. On live now.gg the trail is the FIRST ROW INSIDE the footer (its own bar
// in the footer container, 24px above the link columns) — Footer owns placement;
// this component renders only the trail.
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="size-4 text-text-dim" aria-hidden />}
              {it.href && !last ? (
                <Link href={it.href} className="font-semibold text-text-primary/90 transition-colors hover:text-accent">
                  {it.label}
                </Link>
              ) : (
                <span className={last ? 'text-text-tertiary' : 'font-semibold text-text-primary/90'}>{it.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
