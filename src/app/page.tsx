import { AppShell } from '@/components/shell/AppShell'
import { Section } from '@/components/ui/Section'
import { IconTileGrid } from '@/components/game/IconTileGrid'
import { PosterCard } from '@/components/game/PosterCard'
import { CategoryChips } from '@/components/category/CategoryChips'
import { FeatureCard } from '@/components/media/FeatureCard'
import { AboutSection } from '@/components/marketing/AboutSection'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { MyGamesRow } from '@/components/game/MyGamesRow'
import { CollectionPanel } from '@/components/game/CollectionPanel'
import { TOP_GAMES, MORE_GAMES, POPULAR_GAMES, TOP_PICKS, BLOGS, CATEGORIES } from '@/lib/mock-data'
import { FOOTBALL_FEVER } from '@/lib/collections'

export default function HomePage() {
  return (
    <AppShell>
      {/* now.gg desktop layout: scrolling main column (left) + a STICKY 286px collection
          rail (right). Below xl it collapses to one column with the panel inline. */}
      <div className="xl:flex xl:gap-6">
        <div className="min-w-0 space-y-10 xl:flex-1">
          <MyGamesRow />

          <Section title="Top Games">
            <IconTileGrid games={TOP_GAMES} />
          </Section>

          {/* <xl: the rail panel rides inline here (after Top Games) */}
          <div className="xl:hidden">
            <CollectionPanel title="Football Fever" href="/" games={FOOTBALL_FEVER} className="w-full max-w-[360px]" />
          </div>

          <Section title="Popular Games" action="View All">
            <div className="grid grid-cols-cards-mobile gap-5 md:grid-cols-cards">
              {POPULAR_GAMES.slice(0, 5).map((p) => (
                <PosterCard key={p.id} item={p} />
              ))}
            </div>
          </Section>

          <Section title="More Games">
            <IconTileGrid games={MORE_GAMES} />
          </Section>

          <Section title="Explore by Categories" action="View All">
            <CategoryChips categories={CATEGORIES} />
          </Section>

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

          <AboutSection />

          <Section title="Frequently asked questions" action="View All">
            <FaqAccordion />
          </Section>
        </div>

        {/* xl+: sticky right rail (now.gg's 286px collection column) */}
        <aside className="hidden xl:block xl:w-[286px] xl:shrink-0">
          <div className="sticky top-6">
            <CollectionPanel title="Football Fever" href="/" games={FOOTBALL_FEVER} className="w-full" />
          </div>
        </aside>
      </div>
    </AppShell>
  )
}
