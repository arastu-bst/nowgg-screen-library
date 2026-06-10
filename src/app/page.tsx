import { AppShell } from '@/components/shell/AppShell'
import { Section } from '@/components/ui/Section'
import { IconTileGrid } from '@/components/game/IconTileGrid'
import { PosterCard } from '@/components/game/PosterCard'
import { CategoryChips } from '@/components/category/CategoryChips'
import { FeatureCard } from '@/components/media/FeatureCard'
import { VideoClipCard } from '@/components/media/VideoClipCard'
import { AboutSection } from '@/components/marketing/AboutSection'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { MyGamesRow } from '@/components/game/MyGamesRow'
import { TOP_GAMES, MORE_GAMES, POPULAR_GAMES, TOP_PICKS, VIDEOS, BLOGS, CATEGORIES } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <AppShell>
      <MyGamesRow />

      <Section title="Top Games" moreLabel="Show More">
        <IconTileGrid games={TOP_GAMES} />
      </Section>

      <Section title="Popular Games" action="View All">
        <div className="grid grid-cols-cards-mobile gap-5 md:grid-cols-cards">
          {POPULAR_GAMES.slice(0, 5).map((p) => (
            <PosterCard key={p.id} item={p} />
          ))}
        </div>
      </Section>

      <Section title="More Games" moreLabel="Show More">
        <IconTileGrid games={MORE_GAMES} />
      </Section>

      <Section title="Explore by Categories" action="View All">
        <CategoryChips categories={CATEGORIES} />
      </Section>

      <Section title="Enjoy some Short videos" action="View All">
        <div className="grid grid-cols-cards-mobile gap-5 md:grid-cols-cards">
          {VIDEOS.map((v) => (
            <VideoClipCard key={v.id} video={v} />
          ))}
        </div>
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
    </AppShell>
  )
}
