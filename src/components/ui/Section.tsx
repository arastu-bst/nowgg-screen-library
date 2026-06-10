import { SectionHeader } from './SectionHeader'
import { Button } from './Button'

// Pattern: section heading + content + optional affordance.
// - Card ROWS use `action` (a "View All" link in the header).
// - Tile GRIDS use `moreLabel` (a ghost-pink "Show More" button BELOW the grid).
export function Section({
  title,
  action,
  onAction,
  moreLabel,
  size,
  children,
}: {
  title: string
  action?: string
  onAction?: () => void
  moreLabel?: string
  size?: 'sm' | 'lg'
  children: React.ReactNode
}) {
  return (
    <section>
      <SectionHeader title={title} action={action} onAction={onAction} size={size} className="mb-4" />
      {children}
      {moreLabel && (
        <div className="mt-5">
          <Button variant="ghost" size="md">{moreLabel}</Button>
        </div>
      )}
    </section>
  )
}
