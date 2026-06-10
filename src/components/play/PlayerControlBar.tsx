'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { RunDiagnosticModal } from './RunDiagnosticModal'

// Playing-state control bar (live now.gg): #ng-support · Remove Ads · "Game not
// loading? Refresh page!" · #ng-record-screen · #ng-fs. SOLID BLACK bar (no gradient).
// Icon buttons = 40px tap area with 24px WHITE icons. now.gg buttons are RECTANGULAR
// with a slight radius (never pills). Icon buttons carry a dark hover tooltip. The help
// icon opens the Help & Support modal.
const ic =
  'flex size-10 shrink-0 items-center justify-center rounded-tile text-white transition-colors hover:bg-white-10'
const tip =
  'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-raised px-2.5 py-1 text-2xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100'

export function PlayerControlBar() {
  const [helpOpen, setHelpOpen] = useState(false)
  return (
    <>
    <div className="relative z-20 flex h-16 shrink-0 items-center justify-between gap-3 bg-black px-3">
      {/* left — help + Remove Ads */}
      <div className="flex items-center gap-2">
        <div className="group relative">
          <button className={ic} aria-label="Help & Support" onClick={() => setHelpOpen(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/player/help.svg" alt="" className="size-6" />
          </button>
          <span className={tip}>Help &amp; Support</span>
        </div>
        {/* Remove Ads — Small button (Figma Now-Player 5320:21431): 24px tall, gold
            border r6, white-10 bg, 12px icon, 10px/600 label, padding 12/4, gap 4 */}
        <button className="flex h-6 items-center gap-1 rounded-cta-sm border border-brand-yellow bg-white-10 px-3 text-3xs font-semibold text-white transition-colors hover:bg-white-20">
          <span aria-hidden className="block size-3 shrink-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('/icons/player/remove-ads.png')" }} />
          Remove Ads
        </button>
      </div>

      {/* center — Game not loading? Refresh page! (rectangular, slight radius) */}
      <div className="flex items-center gap-2 rounded-tile bg-white-10 py-1 pl-3 pr-1">
        <span className="hidden text-xs font-medium text-white-70 sm:inline">Game not loading?</span>
        <Button variant="primary" size="sm" shape="rounded">Refresh page!</Button>
      </div>

      {/* right — record + fullscreen */}
      <div className="flex items-center gap-1">
        <div className="group relative">
          <button className={ic} aria-label="Record screen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/player/record.svg" alt="Record" className="size-6" />
          </button>
          <span className={tip}>Screen Recorder</span>
        </div>
        <div className="group relative">
          <button className={ic} aria-label="Fullscreen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/player/fullscreen.svg" alt="" className="size-6" />
          </button>
          <span className={tip}>Full Screen</span>
        </div>
      </div>
    </div>
    {helpOpen && <RunDiagnosticModal onClose={() => setHelpOpen(false)} />}
    </>
  )
}
