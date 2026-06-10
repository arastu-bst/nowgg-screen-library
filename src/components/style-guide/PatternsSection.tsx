import { GameIconTile } from '@/components/game/GameIconTile'
import { PosterCard } from '@/components/game/PosterCard'
import { Breadcrumb } from '@/components/shell/Breadcrumb'
import { RatingBadge } from '@/components/ui/RatingBadge'
import { AdSlot } from '@/components/play/AdSlot'
import { Button } from '@/components/ui/Button'
import { StarIcon, ChevronRight } from '@/components/ui/icons'
import { PopupPreview } from './PopupPreview'
import { GAMES, POSTERS } from '@/lib/mock-data'

// The now.gg pattern kit — recurring COMPOSITIONS (not individual components). Each
// card: a live example + the token/class recipe + where it's used. Full catalog in
// design-source/figma/design-system/PATTERNS.md.
function Pattern({ name, recipe, used, children }: { name: string; recipe: string; used: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-fill-subtle p-5">
      <h3 className="text-sm font-semibold text-text-primary">{name}</h3>
      <div className="flex min-h-[88px] flex-wrap items-center gap-5">{children}</div>
      <p className="font-mono text-3xs leading-relaxed text-text-dim">{recipe}</p>
      <p className="mt-auto text-3xs text-text-faint">Used in: {used}</p>
    </div>
  )
}

export function PatternsSection() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Pattern name="Hover tile — ring + zoom" recipe="group · ring: -inset-px rounded-[r+1] bg-accent-hot opacity-0 group-hover:opacity-100 · clip: overflow-hidden rounded-[r] border-line · img group-hover:scale-105" used="GameIconTile · PosterCard · MyGamesRow · VideoClipCard · FeatureCard · FeaturedBand · PlayerRail">
        <div className="w-20"><GameIconTile game={GAMES[3]} /></div>
        <span className="text-2xs text-text-muted">← hover for the 1px accent-hot ring + 5% zoom</span>
      </Pattern>

      <Pattern name="Media + label card" recipe="clip (ring+zoom) above · title below: text-sm text-text-secondary line-clamp-2 · rating badge hover-revealed" used="PosterCard · VideoClipCard · FeatureCard · FeaturedBand">
        <div className="w-32"><PosterCard item={POSTERS[0]} /></div>
      </Pattern>

      <Pattern name="Section affordances" recipe="ROW → 'View All' header link (text-2xs/600 white-70 + 16px chevron) · GRID → 'Show More' ghost button below" used="every home + play section (SectionHeader + Section)">
        <button className="flex items-center gap-1 text-2xs font-semibold text-text-tertiary">View All <ChevronRight className="size-4" /></button>
        <Button variant="ghost" size="md">Show More</Button>
      </Pattern>

      <Pattern name="Icon button + tooltip" recipe="size-9 rounded-tile text-white-90 hover:bg-white-10 · tooltip: bg-surface-raised, bottom-full, opacity-0 group-hover (Float 'Alt Text')" used="PlayerControlBar (help · record · fullscreen)">
        <div className="group relative">
          <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-raised px-2.5 py-1 text-2xs font-medium text-white">Help &amp; Support</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <button className="flex size-9 items-center justify-center rounded-full hover:bg-white-10"><img src="/icons/player/help.svg" alt="" className="size-9" /></button>
        </div>
      </Pattern>

      <Pattern name="Chip / pill" recipe="chip: rounded-l border-line bg-fill-subtle · pill: rounded-pill · hover: border-line-strong + bg-fill-soft" used="CategoryChips · SearchBar · Button (pill)">
        <span className="flex items-center gap-2 rounded-l border border-line bg-fill-subtle px-4 py-2.5 text-sm text-text-secondary">Browser Games</span>
        <Button shape="pill" size="sm">Pill button</Button>
      </Pattern>

      <Pattern name="Dot-divider meta row" recipe="inline-flex · ★gold + rating · dev · genre, separated by size-1 rounded-full bg-white-40 dots" used="GameStage launch meta">
        <div className="flex items-center gap-3 text-sm text-text-primary">
          <span className="flex items-center gap-1"><StarIcon className="size-4 text-gold" />4.29</span>
          <span className="size-1 rounded-full bg-white-40" />
          <span>Recloak</span>
          <span className="size-1 rounded-full bg-white-40" />
          <span>Browser Games</span>
        </div>
      </Pattern>

      <Pattern name="Ad slot" recipe="SQUARE corners · real creative (object-cover) OR dashed border-line bg-fill-subtle placeholder · sized to the IAB unit" used="PlayerAds (336×280) · play leaderboard (728×90)">
        <AdSlot className="h-[80px] w-[96px]" label="336×280" />
        <AdSlot className="h-[40px] w-[160px]" label="728×90" image="/ad-leaderboard.png" />
      </Pattern>

      <Pattern name="Rating badge" recipe="dark glass pill · gold ★ · 2-decimal rating · hover-revealed top-left on posters" used="PosterCard">
        <RatingBadge rating={4.55} />
      </Pattern>

      <Pattern name="Glass surface" recipe="header: bg-black-70 backdrop-blur-2xl border-b border-line · stage cards: white-05/10 fills + line hairlines over the dark page" used="TopBar · PlayerControlBar · cards">
        <div className="flex items-center rounded-card border border-line bg-black-70 px-4 py-3 backdrop-blur-2xl"><span className="text-2xs text-text-secondary">glass bar (blur + hairline)</span></div>
      </Pattern>

      <Pattern name="Breadcrumb" recipe="trail links white-90/600 · chevron-dim separators · current (last) item text-tertiary, not a link · rendered as the footer's FIRST ROW via Footer's breadcrumb prop (24px above the link columns)" used="play page (footer's first row — its own bar inside the footer)">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Games', href: '/' },
            { label: 'Puzzle', href: '/' },
            { label: 'Little Alchemy 2' },
          ]}
        />
      </Pattern>

      <Pattern name="Popups (glass)" recipe="white-20 frosted panel + backdrop-blur · ALWAYS black-70 scrim · header + X · inputs use Float Forms states (default white-50 → hover white-70 → focus accent)" used="player help icon → Run Diagnostic; Help & Support kept for reference">
        <PopupPreview />
      </Pattern>
    </div>
  )
}
