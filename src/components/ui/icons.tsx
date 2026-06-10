// Two inline glyphs the now.gg / Float library has no clean equivalent for:
// a rating star and a nav chevron. Everything else uses the real library icons via
// the <Icon> component (public/icons/now-gg/*). Brand marks (YouTube/Discord) live
// in Footer; category icons are exported Figma SVGs.
type P = { className?: string }

export const StarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" />
  </svg>
)

export const ChevronRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
