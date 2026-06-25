import { GameIconTile } from '@/components/game/GameIconTile'
import { PosterCard } from '@/components/game/PosterCard'
import { Breadcrumb } from '@/components/shell/Breadcrumb'
import { RatingBadge } from '@/components/ui/RatingBadge'
import { AdSlot } from '@/components/play/AdSlot'
import { Button } from '@/components/ui/Button'
import { StarIcon, ChevronRight } from '@/components/ui/icons'
import { PopupPreview } from './PopupPreview'
import { ProfileSidebarPreview } from './ProfileSidebarPreview'
import { NowPrimePopupPreview } from './NowPrimePopupPreview'
import { CollectionPanel } from '@/components/game/CollectionPanel'
import { cn } from '@/lib/cn'
import { GAMES, POSTERS, ASSETS } from '@/lib/mock-data'
import { FOOTBALL_FEVER } from '@/lib/collections'

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

      <Pattern name="Chip / pill" recipe="chip: rounded-r10 border-line bg-fill-subtle · pill: rounded-pill · hover: border-line-strong + bg-fill-soft" used="CategoryChips · SearchBar · Button (pill)">
        <span className="flex items-center gap-2 rounded-r10 border border-line bg-fill-subtle px-4 py-2.5 text-sm text-text-secondary">Browser Games</span>
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

      <Pattern name="Popups (glass) — CANONICAL frosted-popup structure" recipe="a SEPARATE absolute inset-0 bg-black-70 scrim SIBLING (no blur, onClick close) + backdrop-blur-2xl on the white-20 PANEL itself — NOT scrim-as-container-bg with the blur on a child inside overflow-hidden (that reads invisible). Header + CloseButton · inputs use Float Forms states (white-50 → white-70 → focus accent)" used="Run Diagnostic · Help & Support · Profile sidebar · nowPrime popup">
        <PopupPreview />
      </Pattern>

      <Pattern name="Collection panel (Football Fever)" recipe="bordered card: bg-collection-glow (#111 + top magenta radial) · border-hair border-accent · rounded-xxl · 50px header (title text-base/700 + animated ai-star.gif + 'View all' + chevron, border-b-hair) · vertical GameListRows. Placed as a STICKY xl right rail (aside xl:w-[286px] · sticky top-6 · list xl:max-h-[calc(100vh-156px)] overflow-y-auto); inline below xl." used="homepage right rail (+ inline on mobile)">
        <div className="w-[260px]"><CollectionPanel title="Football Fever" href="/" games={FOOTBALL_FEVER.slice(0, 3)} /></div>
      </Pattern>

      <Pattern name="nowPrime upsell popup (frosted)" recipe="purple bg-prime-hero top + looping now-prime-bg.mp4 wash (opacity-20 mix-blend-lighten) + logo/wordmark + 4 perks (green tick) · white-20 bottom: 3 plan cards (shadow-plan-card) · Best Value = absolute bg-prime-badge pill · CloseButton · uses the canonical frosted structure above · Buy → useNowPrime().subscribe()" used="header NowPrimeCta · /play flow toggler · 'Play in Browser' gate">
        <NowPrimePopupPreview />
      </Pattern>

      <Pattern name="PRIME header lockup (after subscribe)" recipe="once nowPrime'd, HeaderLogo crops the ONE combined now.gg SVG into two overflow-hidden windows (dot + wordmark) so a gold 'PRIME' (text-prime-gold, tracking-[0.3em]) sits 2px under the WORDMARK, dot vertically centered against the now.gg+PRIME block. Default = plain logo (no PRIME)." used="TopBar after a Buy">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="now.gg" className="h-9 w-auto" />
          <span className="self-end pb-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.3em] text-prime-gold">Prime</span>
        </div>
        <span className="text-2xs text-text-muted">← representative; the live lockup crops the combined SVG (see HeaderLogo)</span>
      </Pattern>

      <Pattern name="Flow toggler (dev control)" recipe="fixed bottom-right, portaled to <body>, z-70 · pill rail of player states · active = bg-accent · a design-handoff control to DEMO states, never product chrome (lives outside the design surface)" used="/play (Launch · nowPrime · Ad · Loading · Playing)">
        <div className="inline-flex items-center gap-1 rounded-pill border border-white-10 bg-black-80 p-1 shadow-fl-lg">
          <span className="px-2 text-3xs font-semibold uppercase tracking-wide text-white-50">Flow</span>
          {['Launch', 'nowPrime', 'Ad', 'Loading', 'Playing'].map((s, i) => (
            <span key={s} className={cn('rounded-pill px-3 py-1 text-2xs font-medium', i === 1 ? 'bg-accent text-white' : 'text-white-60')}>{s}</span>
          ))}
        </div>
      </Pattern>

      <Pattern name="Header pill chrome (HEADER_PILL)" recipe="inline-flex items-center rounded-pill border-hair border-white-20 bg-white-10 px-3 shadow-pill hover:bg-white-20 — shared so the two header pills can't drift; each adds its own gap/py/content" used="BluestacksCta · NowPrimeCta (live in Components)">
        <span className="inline-flex items-center gap-2 rounded-pill border-hair border-white-20 bg-white-10 px-3 py-2 text-2xs text-white shadow-pill">white-10 glass pill</span>
      </Pattern>

      <Pattern name="Hover container (bounding area)" recipe="absolute span behind the content: -inset-x-2 -inset-y-1 rounded-card bg-white-05 opacity-0 group-hover:opacity-100 — a soft highlight that bleeds into the surrounding padding; content sits relative above it" used="GameListRow (Football Fever rows) · same idea as the CloseButton hover">
        <div className="group relative inline-flex px-2 py-1">
          <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-card bg-white-10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          <span className="relative text-2xs text-text-secondary">← hover for the container</span>
        </div>
      </Pattern>

      <Pattern name="Profile sidebar (glass drawer)" recipe="right drawer portaled to <body> (escapes TopBar's backdrop-blur containing block) · white-20 frosted panel + backdrop-blur · ALWAYS black-70 scrim (taste 13) · slide-in via translate-x · close/help notch buttons OUTSIDE the left edge, gated on open · inner chips bg-black-20 on the glass" used="TopBar avatar → every page">
        <ProfileSidebarPreview />
      </Pattern>
    </div>
  )
}
