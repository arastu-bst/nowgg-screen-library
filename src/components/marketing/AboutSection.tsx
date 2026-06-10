import { Section } from '@/components/ui/Section'

// "What is now.gg" (Figma 5316:8960) — SEO content: 4 sub-blocks (subtitle 16/600
// white-70 + body 16/400 white-60), View All header. Real now.gg copy.
const BLOCKS = [
  { h: 'Online Games - Play Anywhere, Anytime', p: 'Discover a world of excitement with our vast collection of free online games, conveniently accessible with no downloads required. Get ready to immerse yourself in endless fun, whether playing solo, challenging friends, or seeking thrilling multiplayer adventures.' },
  { h: 'Free Online Games at Your Fingertips', p: 'Play online from a wide variety of fun online games, including Roblox, Bloxd.io, and Poppy Playtime. You can find a game to fit your mood and interests among the various game genres, such as card games, sports games, shooting games, ludo games, solitaire games, browser games, quiz games, and exciting zombie games. Get ready to embark on unforgettable adventures and immerse yourself in exhilarating gaming experiences. Start playing right away and enjoy yourself!' },
  { h: 'Multiplayer Adventures Await', p: 'Gaming online with friends is more fun, and now.gg has you covered. Explore our collection of online multiplayer games to play with friends and engage in epic combat. You can choose from numerous games like Roblox, Soul Land Reloaded, Fireboy and Watergirl 2: Light Temple, Among Us, Call of Duty, and many more. Connect with friends from around the world and let the competition begin.' },
  { h: 'Fun for All Ages', p: 'Players of all ages can play games on now.gg. We recognize the value of offering children a fun and secure gaming environment. Explore our selection of games like Kahoot! Play & Create Quizzes, Toca Kitchen 2, and VEXcode V5 — carefully chosen to guarantee fun. Our games keep young minds entertained and inspired, from educational quizzes to delightful adventures.' },
]

export function AboutSection() {
  return (
    <Section title="What is now.gg" action="View All">
      <div className="space-y-5">
        {BLOCKS.map((b) => (
          <div key={b.h} className="space-y-2">
            <h3 className="text-base font-semibold text-text-tertiary">{b.h}</h3>
            <p className="text-base leading-snug text-text-muted">{b.p}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
