import { SearchBar } from './SearchBar'
import { ProfileMenu } from './ProfileMenu'
import { HeaderLogo } from './HeaderLogo'
import { BluestacksCta } from '@/components/ui/BluestacksCta'
import { NowPrimeCta } from '@/components/ui/NowPrimeCta'

// "Play Page Header / Desktop" — Figma 5315:8426. 64px, black-70 + heavy backdrop
// blur (glass) + white-10 hairline. Padding 24/8, item gap 12. Logo (40px) + AI
// search sit LEFT; a flexible spacer; then the right cluster: profile avatar ·
// divider · Ana assistant widget. (Avatars are placeholders — see scratchpad.)
export function TopBar() {
  return (
    <header className="z-30 flex h-header shrink-0 items-center gap-3 border-b border-line bg-black-70 pl-6 pr-2 backdrop-blur-2xl">
      <HeaderLogo />

      <SearchBar />

      <div className="ml-auto flex shrink-0 items-center gap-3 pl-2">
        {/* nowPrime upsell CTA → opens the nowPrime popup */}
        <NowPrimeCta />
        {/* cross-brand download CTA → bluestacks.com (now.gg → BlueStacks ad experiment) */}
        <BluestacksCta />
        {/* logged-in user avatar → opens the Profile sidebar (Figma User-Profile 26500:133019) */}
        <ProfileMenu />
        <span className="h-5 w-px shrink-0 bg-line-strong" aria-hidden />
        {/* Ana AI assistant widget — autoplaying looped video */}
        <video
          src="/ana-exp.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Ana assistant"
          className="size-14 shrink-0 rounded-pill object-cover"
        />
      </div>
    </header>
  )
}
