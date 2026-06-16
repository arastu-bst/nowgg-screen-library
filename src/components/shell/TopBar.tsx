import Link from 'next/link'
import { SearchBar } from './SearchBar'
import { ProfileMenu } from './ProfileMenu'
import { BluestacksCta } from '@/components/ui/BluestacksCta'
import { ASSETS } from '@/lib/mock-data'

// "Play Page Header / Desktop" — Figma 5315:8426. 64px, black-70 + heavy backdrop
// blur (glass) + white-10 hairline. Padding 24/8, item gap 12. Logo (40px) + AI
// search sit LEFT; a flexible spacer; then the right cluster: profile avatar ·
// divider · Ana assistant widget. (Avatars are placeholders — see scratchpad.)
export function TopBar() {
  return (
    <header className="z-30 flex h-header shrink-0 items-center gap-3 border-b border-line bg-black-70 pl-6 pr-2 backdrop-blur-2xl">
      <Link href="/" aria-label="now.gg home" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.logo} alt="now.gg" className="h-10 w-auto" />
      </Link>

      <SearchBar />

      <div className="ml-auto flex shrink-0 items-center gap-3 pl-2">
        {/* cross-brand download CTA → bluestacks.com (now.gg → BlueStacks ad experiment) */}
        <BluestacksCta context="topbar" />
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
