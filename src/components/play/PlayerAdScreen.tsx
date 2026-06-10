'use client'
import { useEffect, useState } from 'react'
import type { PlayGame } from '@/lib/play'

// The pre-roll AD state (images #18/#20) shown after "Play in Browser": a (placeholder)
// ad video area with the "Ad : (0:NN)" countdown + game icon; a thin strip with the
// ad timer + help; the PINK loader bar sitting directly ON TOP of the magenta→purple
// "<game> will launch after the ad" gradient bar. Auto-advances to the playing state.
const AD_SECONDS = 6 // demo length (the live pre-roll is ~25s)

export function PlayerAdScreen({ game, onComplete }: { game: PlayGame; onComplete: () => void }) {
  const [left, setLeft] = useState(AD_SECONDS)
  useEffect(() => {
    if (left <= 0) {
      onComplete()
      return
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [left, onComplete])

  const pct = ((AD_SECONDS - left) / AD_SECONDS) * 100
  const mmss = `0:${String(left).padStart(2, '0')}`

  return (
    <div className="relative z-10 flex min-w-0 flex-1 flex-col">
      {/* ad video area (placeholder) */}
      <div className="relative flex-1 bg-black">
        <span className="absolute left-4 top-3 text-sm font-medium text-gold">Ad : ({mmss})</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={game.icon} alt={game.title} className="absolute right-3 top-3 size-9 rounded-md object-cover ring-1 ring-white-20" />
      </div>

      {/* thin strip: ad timer (left) + help (right) */}
      <div className="flex items-center justify-between bg-black px-4 py-1">
        <span className="text-2xs text-white-50">Ad: {mmss}</span>
        <button aria-label="Help" className="transition-opacity hover:opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/player/help.svg" alt="Help" className="size-5" />
        </button>
      </div>

      {/* PINK loader — sits flush on top of the gradient bar */}
      <div className="h-1 w-full bg-white-10">
        <div className="h-full bg-ad-loader transition-all duration-1000 ease-linear" style={{ width: `${pct}%` }} />
      </div>

      {/* "<game> will launch after the ad" gradient bar */}
      <div className="flex items-center gap-3 bg-widget-bar px-4 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={game.icon} alt="" className="size-8 rounded-md object-cover" />
        <span className="text-sm font-bold text-white">{game.title} will launch after the ad</span>
      </div>
    </div>
  )
}
