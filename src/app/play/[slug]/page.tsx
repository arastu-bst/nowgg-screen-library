import { TopBar } from '@/components/shell/TopBar'
import { Footer } from '@/components/shell/Footer'
import { PlayerAds } from '@/components/play/PlayerAds'
import { PlayerRail } from '@/components/play/PlayerRail'
import { GameStage } from '@/components/play/GameStage'
import { AdSlot } from '@/components/play/AdSlot'
import { FeaturedBand } from '@/components/play/FeaturedBand'
import { Section } from '@/components/ui/Section'
import { IconTileGrid } from '@/components/game/IconTileGrid'
import { FeatureCard } from '@/components/media/FeatureCard'
import { CategoryChips } from '@/components/category/CategoryChips'
import { findPlayGame } from '@/lib/play'
import { FEATURED } from '@/lib/featured'
import { TOP_GAMES, MORE_GAMES, BLOGS, TOP_PICKS, CATEGORIES, GAMES } from '@/lib/mock-data'

// Single game-player page (design handoff): opens for ANY game tile (slug-aware
// branding). Layout mirrors live now.gg/apps/.../little-alchemy-2:
//   1) PLAYER HERO (fills the first screen): left ad column (2× 336×280 + "Ads help
//      keep now.gg Free!" divider) · 70px recent-games rail · game canvas + control
//      bar · 728×90 leaderboard below the canvas.
//   2) CONTENT (scroll): Popular Games · [full-width promoted-games band] · Video
//      Clips · Blogs · Top Picks · More Games · Explore by Categories · breadcrumb.
// The cloud-streamed game itself is a design-only placeholder canvas.
export default function PlayPage({ params }: { params: { slug: string } }) {
  const game = findPlayGame(params.slug)
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-page-bg">
      <div className="pointer-events-none fixed inset-0 z-0 bg-glow-page" aria-hidden />
      <TopBar />
      <main className="scroll-thin relative z-10 min-h-0 flex-1 overflow-y-auto">
        {/* ── PLAYER HERO ── fills the viewport below the 64px header (live ≈ 722px) */}
        <section className="flex h-[calc(100vh-64px)] min-h-[600px] gap-3 p-3">
          <PlayerAds />
          <PlayerRail games={GAMES.slice(0, 9)} />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <GameStage game={game} />
            {/* 728×90 leaderboard at its true unit size, centered under the canvas */}
            <AdSlot className="h-[90px] w-[728px] max-w-full shrink-0 self-center" label="Leaderboard · 728 × 90" image="/ad-leaderboard.png" />
          </div>
        </section>

        {/* ── Popular Games (square icon tiles) ── */}
        <div className="mx-auto max-w-content px-4 py-10 md:px-6">
          <Section title="Popular Games">
            <IconTileGrid games={TOP_GAMES} />
          </Section>
        </div>

        {/* ── Promoted-games band ── unlabeled, full-width white-10 (live) ── */}
        <FeaturedBand games={FEATURED} />

        {/* ── Remaining sections ── live order + headings ── */}
        <div className="mx-auto max-w-content space-y-10 px-4 py-10 md:px-6">
          <Section title="Blogs" action="View All">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {BLOGS.map((a) => (
                <FeatureCard key={a.id} article={a} />
              ))}
            </div>
          </Section>

          <Section title="Top Picks" action="View All">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TOP_PICKS.map((a) => (
                <FeatureCard key={a.id} article={a} />
              ))}
            </div>
          </Section>

          <Section title="More Games">
            <IconTileGrid games={MORE_GAMES} />
          </Section>

          <Section title="Explore by Categories" action="View All">
            <CategoryChips categories={CATEGORIES} />
          </Section>
        </div>

        {/* ── Footer with its breadcrumb bar (live: trail is the footer's first row) ── */}
        <Footer
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Games', href: '/' },
            { label: game.genre, href: '/' },
            { label: game.title },
          ]}
        />
      </main>
    </div>
  )
}
