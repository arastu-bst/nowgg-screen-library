import { Button } from '@/components/ui/Button'
import { RatingBadge } from '@/components/ui/RatingBadge'
import { CloseButtonPreview } from './CloseButtonPreview'
import { BluestacksCta } from '@/components/ui/BluestacksCta'
import { NowPrimeCta } from '@/components/ui/NowPrimeCta'
import { GameIconTile } from '@/components/game/GameIconTile'
import { PosterCard } from '@/components/game/PosterCard'
import { GameListRow } from '@/components/game/GameListRow'
import { CategoryChips } from '@/components/category/CategoryChips'
import { AdSlot } from '@/components/play/AdSlot'
import { GAMES, POSTERS, CATEGORIES } from '@/lib/mock-data'
import { FOOTBALL_FEVER } from '@/lib/collections'

const VARIANTS = ['primary', 'secondary', 'white', 'outline', 'ghost', 'subtle', 'neutral', 'text'] as const

// Float component library (live counts from the Figma summary).
const FLOAT_CATEGORIES: [string, string][] = [
  ['Developer Resource', '35'], ['Tags', '5'], ['Browser', 'set'], ['Chat', 'set'], ['Share', 'set'],
  ['Home', 'set'], ['List View', 'set'], ['Full Logo', 'set'], ['Logo Art', 'set'], ['Favicon', 'set'],
  ['nowAds Logo', 'set'], ['Cloudies', 'set'], ['nowPremium Logo', 'set'], ['Overlay', 'set'], ['Arrows', 'set'],
]

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-tertiary">{title}</h3>
      {children}
    </div>
  )
}

export function ComponentsSection() {
  return (
    <div className="space-y-10">
      <Sub title="Buttons (Float variants)">
        <div className="flex flex-wrap items-center gap-3">
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} size="md">{v}</Button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
          <Button size="xl">xl</Button>
          <Button shape="pill">pill</Button>
          <Button disabled>disabled</Button>
        </div>
      </Sub>

      <Sub title="Game tiles & cards">
        <div className="flex flex-wrap items-end gap-6">
          <div className="w-24"><GameIconTile game={GAMES[0]} /></div>
          <div className="w-24"><GameIconTile game={GAMES[3]} /></div>
          <div className="w-40"><PosterCard item={POSTERS[0]} /></div>
          <div className="self-start"><RatingBadge rating={4.29} /></div>
        </div>
      </Sub>

      <Sub title="Header brand pills (white-10 glass · shared HEADER_PILL chrome + shadow-pill + border-hair)">
        <div className="flex flex-wrap items-center gap-3">
          <NowPrimeCta />
          <BluestacksCta />
        </div>
        <p className="mt-2 text-2xs text-text-faint">NowPrimeCta opens the nowPrime popup · BluestacksCta is a crawlable &lt;a&gt; → bluestacks.com.</p>
      </Sub>

      <Sub title="Close button — the ONE shared popup close (CloseButton)">
        <div className="inline-flex rounded-card border border-line bg-surface p-2">
          <CloseButtonPreview />
        </div>
        <p className="mt-2 text-2xs text-text-faint">20px glyph in a 36px hit target · white-70 → white + white-10 hover container · used by every popup (NowPrime, Help &amp; Support, Run Diagnostic).</p>
      </Sub>

      <Sub title="Collection row + rating pill (GameListRow)">
        <div className="max-w-[320px] rounded-card border border-line bg-surface p-3">
          <GameListRow game={FOOTBALL_FEVER[0]} />
        </div>
        <p className="mt-2 text-2xs text-text-faint">80px icon (rounded-card, hover zoom + white-05 hover container) · title white-80 clamp-2 · rating pill black-20 rounded-m + gold ★ + 1-decimal.</p>
      </Sub>

      <Sub title="Best Value badge (nowPrime · bg-prime-badge)">
        <span className="inline-block rounded-pill bg-prime-badge px-2.5 py-[5px] text-3xs font-bold uppercase leading-none tracking-wide text-white">Best Value</span>
      </Sub>

      <Sub title="Category chips">
        <CategoryChips categories={CATEGORIES.slice(0, 8)} />
      </Sub>

      <Sub title="Ad units (play page)">
        <div className="flex flex-wrap items-start gap-4">
          <AdSlot className="h-[160px] w-[192px]" label="Large Rectangle · 336×280" />
          <AdSlot className="h-[60px] w-[300px]" label="Leaderboard · 728×90" />
        </div>
      </Sub>

      <Sub title="Float component library (221 components · 109 sets)">
        <div className="flex flex-wrap gap-2">
          {FLOAT_CATEGORIES.map(([name, n]) => (
            <span key={name} className="rounded-pill border border-line bg-fill-subtle px-3 py-1.5 text-2xs text-text-tertiary">
              {name} <span className="text-text-dim">· {n}</span>
            </span>
          ))}
        </div>
      </Sub>
    </div>
  )
}
