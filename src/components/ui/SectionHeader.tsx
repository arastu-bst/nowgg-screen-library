import { cn } from '@/lib/cn'
import { ChevronRight } from './icons'

// Section header — Figma "Section Title" (5315:8556): title 24px/600/white-90
// (designer bumped from the 20px extraction — slightly larger, consistent across
// home + play), white-10 bottom hairline; action = "View All" 12px/600/white-70 +
// 16px chevron. The `lg` size (32px) is currently unused (cleanup candidate).
export function SectionHeader({
  title,
  action,
  onAction,
  size = 'sm',
  className,
}: {
  title: string
  action?: string
  onAction?: () => void
  size?: 'sm' | 'lg'
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between gap-3 border-b border-line pb-2', className)}>
      <h2 className={cn('font-semibold text-text-primary/90', size === 'lg' ? 'text-2xl' : 'text-xl')}>{title}</h2>
      {action && (
        <button
          onClick={onAction}
          className="flex shrink-0 items-center gap-1 text-2xs font-semibold text-text-tertiary transition-colors hover:text-text-primary"
        >
          {action}
          <ChevronRight className="size-4" />
        </button>
      )}
    </div>
  )
}
