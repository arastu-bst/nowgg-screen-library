'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { StarIcon } from '@/components/ui/icons'
import { PlayerAdScreen } from './PlayerAdScreen'
import { PlayerControlBar } from './PlayerControlBar'
import type { PlayGame } from '@/lib/play'

// The "Gameplay Area" (Figma 5318:18653) with its three live states:
//   • launch  — launch video (Launch_1920.mp4) + 70% scrim + game icon/title/meta/
//               CTA/blurb. NO bottom bar — the canvas is full-height. (image #17)
//   • ad      — pre-roll ad + pink loader + "<game> will launch after the ad" bar. (image #18)
//   • playing — game canvas + the control bar (help · Remove Ads · Refresh · record ·
//               fullscreen). (image #19)
// "Play in Browser" drives launch → ad → playing. The real cloud game is design-only.
type Phase = 'launch' | 'ad' | 'loading' | 'playing'

export function GameStage({ game }: { game: PlayGame }) {
  const [phase, setPhase] = useState<Phase>('launch')

  // brief game-loading state → playing
  useEffect(() => {
    if (phase !== 'loading') return
    const t = setTimeout(() => setPhase('playing'), 1800)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-card border border-line bg-black">
      {/* launch video background + 70% scrim — ONLY during the launch state */}
      {phase === 'launch' && (
        <>
          {/* plays in the browser; headless tools may not decode mp4 */}
          <video
            src="/Launch_1920.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none absolute inset-0 size-full object-cover"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-black-70" aria-hidden />
        </>
      )}

      {/* ── LAUNCH (no bottom bar; canvas is full height) ── */}
      {phase === 'launch' && (
        <div className="relative z-10 flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.icon} alt={game.title} className="size-[132px] rounded-xl border border-white-10 object-cover shadow-card" />
            <div className="space-y-2.5">
              <h1 className="text-xl font-semibold text-text-primary">{game.title}</h1>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-text-primary">
                <span className="flex items-center gap-1"><StarIcon className="size-4 text-gold" />{game.rating.toFixed(2)}</span>
                <span className="size-1 rounded-full bg-white-40" aria-hidden />
                <span>{game.dev}</span>
                <span className="size-1 rounded-full bg-white-40" aria-hidden />
                <Link href="/" className="underline-offset-2 hover:underline">{game.genre}</Link>
              </div>
              {game.tag && (
                <div className="flex justify-center">
                  <span className="rounded-pill bg-white-10 px-3 py-1 text-2xs text-text-primary/70">{game.tag}</span>
                </div>
              )}
            </div>
            <Button variant="primary" size="lg" className="mt-1 min-w-[184px] py-3" onClick={() => setPhase('ad')}>
              Play in Browser
            </Button>
          </div>
          <div className="mx-auto max-w-2xl px-6 pb-5 text-center">
            <p className="text-base font-semibold text-text-primary/80">Play {game.title} Online in Browser</p>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-primary/70">{game.description}</p>
            <div className="mt-1.5 flex items-center justify-center gap-3 text-2xs font-medium text-text-primary">
              <button className="underline-offset-2 hover:text-accent hover:underline">READ MORE</button>
              <span className="h-3 w-px bg-white-30" aria-hidden />
              <button className="underline-offset-2 hover:text-accent hover:underline">FAQs</button>
            </div>
          </div>
        </div>
      )}

      {/* ── AD (pre-roll) ── */}
      {phase === 'ad' && <PlayerAdScreen game={game} onComplete={() => setPhase('loading')} />}

      {/* ── LOADING — cyan→purple "Widget Bar" (Figma Now-Player 5319:20752) ── */}
      {phase === 'loading' && (
        <>
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.icon} alt={game.title} className="size-16 rounded-xl border border-white-10 object-cover" />
            <span className="size-6 animate-spin rounded-full border-2 border-white-20 border-t-accent" aria-hidden />
            <p className="text-sm font-medium text-white-50">Loading {game.title}…</p>
          </div>
          <div className="h-12 shrink-0 bg-widget-bar backdrop-blur-2xl" aria-hidden />
        </>
      )}

      {/* ── PLAYING (game canvas + control bar) ── */}
      {phase === 'playing' && (
        <>
          {/* game screen — design-only placeholder (the real cloud game streams here) */}
          <div className="relative z-10 flex-1 overflow-hidden bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/game-running.png" alt={`${game.title} running`} className="size-full object-cover" />
          </div>
          <PlayerControlBar />
        </>
      )}
    </div>
  )
}
