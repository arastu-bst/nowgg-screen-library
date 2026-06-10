import { cn } from '@/lib/cn'

// Ad slot on the play page. now.gg runs 336×280 Large Rectangle units (side rail, ×2)
// and a 728×90 Leaderboard (below the canvas). With `image`, renders the real ad
// creative filling the slot; otherwise a dashed box sized to the IAB unit. The
// "Ads help keep now.gg Free!" caption is a separate divider (see PlayerAds).
export function AdSlot({ className, label = 'Advertisement', image }: { className?: string; label?: string; image?: string }) {
  if (image) {
    return (
      <div className={cn('overflow-hidden', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={label} className="h-full w-full object-cover" />
      </div>
    )
  }
  return (
    <div className={cn('flex items-center justify-center border border-dashed border-line bg-fill-subtle px-4 text-center', className)}>
      <p className="text-3xs uppercase tracking-wider text-text-dim">{label}</p>
    </div>
  )
}
