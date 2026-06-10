import { Icon } from '@/components/ui/Icon'
import type { Video } from '@/lib/mock-data'

// Short-video card (Figma/live "Enjoy some Short videos"): ~2:3 portrait thumbnail,
// caption BELOW the card. Hover → 1px gradient ring + slight zoom + a pink play
// button (hover-only, not always-on).
export function VideoClipCard({ video }: { video: Video }) {
  return (
    <a className="group flex flex-col gap-2">
      <div className="relative aspect-[2/3]">
        <span className="pointer-events-none absolute -inset-px rounded-[13px] bg-accent-hot opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
        <div className="relative size-full overflow-hidden rounded-card border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.poster} alt="" aria-hidden className="size-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
        <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-accent text-white opacity-0 shadow-glow-hover transition-opacity duration-200 group-hover:opacity-100">
          <Icon name="state-play-style-filled" className="size-5" />
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-text-secondary">{video.caption}</p>
    </a>
  )
}
