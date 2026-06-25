'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { CloseButton } from '@/components/ui/CloseButton'
import { useNowPrime } from '@/components/providers/NowPrimeProvider'

// nowPrime upsell popup — replicated 1:1 from the live now.gg app-page "Play in Browser"
// gate. TOP = purple gradient (#352f87→#5c54c7, token bg-prime-hero) with the real
// now-pass.mp4 wash behind it (opacity .2, mix-blend lighten) + nowPrime logo/wordmark +
// 4 perks (green tick.svg). BOTTOM = white-20 panel with the 3 plan cards (Monthly = Best
// Value, gradient pill token bg-prime-badge). All art = the real now.gg assets. Scrim =
// black-70; portaled to <body> (project overlay pattern — avoids backdrop-filter traps).
const PERKS = [
  'No Ads',
  'Play on any Proxy or VPN',
  'Continue playing on any device',
  'Full-screen immersive gameplay',
]

type Plan = { name: string; titleColor: string; original: string; off: string; price: string; best?: boolean }
const PLANS: Plan[] = [
  { name: 'Daily',   titleColor: 'text-accent',      original: '₹99',  off: '10% off', price: '₹89' },
  { name: 'Weekly',  titleColor: 'text-logo-purple', original: '₹349', off: '10% off', price: '₹299' },
  { name: 'Monthly', titleColor: 'text-gradient-blue', original: '₹999', off: '20% off', price: '₹799', best: true },
]

export function NowPrimePopup({ onClose }: { onClose: () => void }) {
  const { subscribe } = useNowPrime()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* scrim — separate absolute sibling, ALWAYS black-70 (same pattern as Help & Support / Run Diagnostic) */}
      <div className="absolute inset-0 bg-black-70" onClick={onClose} aria-hidden />
      {/* glass panel — backdrop-blur on the wrapper: opaque top covers it, white-20 bottom shows the blur */}
      <div className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-card shadow-fl-lg backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
        {/* ── TOP: purple gradient + animated wash + logo/wordmark + perks ── */}
        <div className="relative overflow-hidden bg-prime-hero px-8 py-5">
          <video
            src="/now-prime-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            onEnded={(e) => { const v = e.currentTarget; v.currentTime = 0; void v.play().catch(() => {}) }}
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-20 mix-blend-lighten"
          />
          <CloseButton onClose={onClose} className="absolute right-3 top-3 z-[2]" />
          <div className="relative z-[1] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {/* nowPrime logo + wordmark — real now.gg assets */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/now-gg/now-prime-logo.webp" alt="" aria-hidden className="size-6" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/now-gg/now-prime-text.webp" alt="nowPrime" className="-mt-0.5 h-5 w-auto" />
            </div>
            <ul className="flex flex-col gap-2">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-semibold text-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icons/now-gg/tick.svg" alt="" aria-hidden className="size-[15px] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BOTTOM: white-20 (the wrapper's backdrop-blur shows through here) + plan cards ── */}
        <div className="bg-white-20 px-8 pb-8 pt-4">
          <p className="text-sm font-semibold text-white-70">Choose your plan</p>
          <div className="mt-5 flex items-end gap-4">
            {PLANS.map((pl) => (
              <div
                key={pl.name}
                className={cn(
                  'relative flex flex-1 flex-col items-center rounded-m bg-white px-3 pb-3 text-center shadow-plan-card',
                  // best card gets extra top padding so its badge clears the title (now.gg: 24 vs 12)
                  pl.best ? 'pt-6' : 'pt-3',
                )}
              >
                {pl.best && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-pill bg-prime-badge px-2.5 py-[5px] text-3xs font-bold uppercase leading-none tracking-wide text-white">
                    Best Value
                  </span>
                )}
                <p className={cn('text-sm font-bold', pl.titleColor)}>{pl.name}</p>
                <p className="mt-1 text-sm font-medium text-status-alert line-through">{pl.original}</p>
                <p className="text-[11px] font-semibold text-logo-green">{pl.off}</p>
                <p className="mt-0.5 text-lg font-semibold text-black-70">{pl.price}</p>
                <button
                  onClick={() => { subscribe(); onClose() }}
                  className="mt-2.5 w-full rounded-cta-sm bg-accent px-4 py-[7px] text-2xs font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
