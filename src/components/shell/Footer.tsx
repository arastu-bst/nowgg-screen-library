import { Breadcrumb, type Crumb } from './Breadcrumb'

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
                    <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  YouTube
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2.5 text-sm text-text-tertiary transition-colors hover:text-text-primary">
                  <svg viewBox="0 0 24 24" className="size-5 text-brand-discord" fill="currentColor" aria-hidden>
                    <path d="M19 5a16 16 0 0 0-4-1l-.3.5a12 12 0 0 1 3.6 1.8C16 5.5 14 5 12 5s-4 .5-6.3 1.3A12 12 0 0 1 9.3 4.5L9 4a16 16 0 0 0-4 1C2.5 9 2 13 2 17a13 13 0 0 0 4 2l1-1.6c-.7-.3-1.4-.6-2-1l.5-.4a9 9 0 0 0 13 0l.5.4c-.6.4-1.3.7-2 1L18 19a13 13 0 0 0 4-2c0-4-.5-8-3-12zM9 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
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
