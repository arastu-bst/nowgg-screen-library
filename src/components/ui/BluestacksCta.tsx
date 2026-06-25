import { cn } from '@/lib/cn'
import { HEADER_PILL } from './headerPill'

// Cross-brand "Download BlueStacks · by now.gg" CTA → bluestacks.com (the now.gg →
// BlueStacks ad-serving experiment). A REAL crawlable external <a> (new tab), shown ONLY
// in the TopBar. Brand lockup replicated 1:1 from the LIVE now.gg header (`sc-404ed2b-0`):
// a white-10 pill (white-20 hairline + soft drop shadow), the full-color 32px BlueStacks
// logo, and a two-line label — "Download BlueStacks" (15/700 white) over "by now" (11/500
// white-70) + ".gg" (11/500 now.gg-pink). The pink ".gg" is the now.gg *wordmark tail*,
// not a Play-CTA spotlight (taste-2's pink reservation governs clickable Play affordances).
// The logo is multi-color → exported PNG asset, never a themed Icon mask.
// (S8: the play-hero / footer / homepage-band placements were removed — header-only now.)
const URL = 'https://www.bluestacks.com'
const LOGO = '/bluestacks-logo.png' // official now.gg asset (96² @3x), scraped from live
const LABEL = 'BlueStacks by now.gg'

export function BluestacksCta({ className }: { className?: string }) {
  return (
    <a
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        HEADER_PILL,
        'justify-center gap-2.5 py-1 tracking-[0.2px] text-white',
        className,
      )}
    >
      {/* multi-color brand mark → exported PNG asset, not a themed Icon mask */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO} alt="" aria-hidden className="size-8 shrink-0" />
      {/* full label always in DOM (accessible name + crawlable); two-line shown lg+ */}
      <span className="sr-only">Download {LABEL}</span>
      <span className="hidden flex-col lg:flex" aria-hidden>
        <span className="text-[15px] font-bold leading-[16.5px]">Download BlueStacks</span>
        <span className="text-[11px] font-medium leading-[12.1px]">
          <span className="text-white-70">by now</span>
          <span className="text-accent">.gg</span>
        </span>
      </span>
    </a>
  )
}
