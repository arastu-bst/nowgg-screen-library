import { Breadcrumb, type Crumb } from './Breadcrumb'
import { DiscordGlyph, YouTubeGlyph } from '@/components/ui/icons'
import { BluestacksCta } from '@/components/ui/BluestacksCta'

// Footer — matched to the LIVE now.gg footer (the Figma frame diverged; live wins).
// Optional breadcrumb trail renders as the footer's own first row (live: the trail
// `<ul>` sits INSIDE `<footer>`, 24px above the link columns — play page only).
// logo + MOBILE CLOUD · Games[8] · Company + Resources · Help & Support + Social.
type Link = { t: string; ext?: boolean }

function ExtArrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

function Col({ head, links }: { head: string; links: Link[] }) {
  return (
    <div>
      <p className="text-2xs font-semibold uppercase tracking-wider text-text-faint">{head}</p>
      <ul className="mt-3 space-y-2.5">
        {links.map((l) => (
          <li key={l.t}>
            <a className="inline-flex items-center gap-1 text-sm text-text-tertiary transition-colors hover:text-text-primary">
              {l.t}
              {l.ext && <ExtArrow />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer({ breadcrumb }: { breadcrumb?: Crumb[] }) {
  return (
    <footer className="relative z-10 mt-12 border-t border-line px-4 py-10 md:px-6">
      {breadcrumb && (
        <div className="mx-auto mb-6 max-w-content">
          <Breadcrumb items={breadcrumb} />
        </div>
      )}
      <div className="mx-auto grid max-w-content grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/footer-logo.svg" alt="now.gg — Mobile Cloud" className="h-16 w-auto" />
          {/* cross-brand download CTA → bluestacks.com (now.gg → BlueStacks ad experiment) */}
          <BluestacksCta context="footer" className="mt-4" />
        </div>

        <Col head="Games" links={[{ t: 'All Games' }, { t: 'Action' }, { t: 'RPG' }, { t: 'Strategy' }, { t: 'Casual' }, { t: 'Puzzle' }, { t: 'Adventure' }, { t: 'Simulation' }]} />

        <div className="space-y-7">
          <Col head="Company" links={[{ t: 'About Us' }, { t: 'News' }]} />
          <Col head="Resources" links={[{ t: 'Blog' }, { t: 'Developers', ext: true }]} />
        </div>

        <div className="space-y-7">
          <Col head="Help & Support" links={[{ t: 'Get in Touch' }, { t: 'Help center' }]} />
          <div>
            <p className="text-2xs font-semibold uppercase tracking-wider text-text-faint">Social</p>
            <ul className="mt-3 space-y-3">
              <li>
                <a className="inline-flex items-center gap-2.5 text-sm text-text-tertiary transition-colors hover:text-text-primary">
                  <span className="flex size-5 items-center justify-center rounded bg-brand-youtube text-white">
                    <YouTubeGlyph className="size-3" />
                  </span>
                  YouTube
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2.5 text-sm text-text-tertiary transition-colors hover:text-text-primary">
                  <DiscordGlyph className="size-5 text-brand-discord" />
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-content border-t border-line pt-6 text-center text-2xs text-text-dim">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <a className="hover:text-text-tertiary">Terms and Privacy</a>
          <a className="hover:text-text-tertiary">Copyright Dispute Policy</a>
          <a className="hover:text-text-tertiary">EU Privacy</a>
        </div>
        <p className="mt-3">© 2026 now.gg. All rights reserved. By using now.gg you agree to our Terms of use and Privacy Policy</p>
      </div>
    </footer>
  )
}
