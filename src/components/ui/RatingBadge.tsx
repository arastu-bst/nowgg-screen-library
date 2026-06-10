import { cn } from '@/lib/cn'
import { StarIcon } from './icons'

// Rating pill shown on hover over a game tile/card (top-left). Dark glass + gold star.
export function RatingBadge({ rating, className }: { rating: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-black-80 px-1.5 py-0.5 text-2xs font-semibold text-white backdrop-blur-sm',
        className,
      )}
    >
      <StarIcon className="size-3 text-gold" />
      {rating.toFixed(2)}
    </span>
  )
}
