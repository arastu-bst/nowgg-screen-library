import { AdSlot } from './AdSlot'

// The player's left ad column (live now.gg ad units): two stacked 336×280 Large
// Rectangle units with the "Ads help keep now.gg Free!" divider between them
// (14px, white-50). Hidden below lg — on mobile the game canvas takes the full width.
export function PlayerAds() {
  return (
    <aside className="hidden w-[336px] shrink-0 flex-col items-center lg:flex">
      <AdSlot className="h-[280px] w-[336px]" label="Large Rectangle · 336 × 280" image="/ad-rectangle-decathlon.png" />
      <p className="py-3 text-center text-sm font-medium text-text-primary/50">Ads help keep now.gg Free!</p>
      <AdSlot className="h-[280px] w-[336px]" label="Large Rectangle · 336 × 280" image="/ad-rectangle-vr.png" />
    </aside>
  )
}
