// Inline glyphs the now.gg / Float library has no clean equivalent for: a rating
// star, a nav chevron, and the two third-party brand marks (Discord, YouTube).
// Everything else uses the real library icons via the <Icon> component
// (public/icons/now-gg/*); category icons are exported Figma SVGs.
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

// Third-party brand marks (used in Footer + ProfileSidebar social links).
export const DiscordGlyph = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M19 5a16 16 0 0 0-4-1l-.3.5a12 12 0 0 1 3.6 1.8C16 5.5 14 5 12 5s-4 .5-6.3 1.3A12 12 0 0 1 9.3 4.5L9 4a16 16 0 0 0-4 1C2.5 9 2 13 2 17a13 13 0 0 0 4 2l1-1.6c-.7-.3-1.4-.6-2-1l.5-.4a9 9 0 0 0 13 0l.5.4c-.6.4-1.3.7-2 1L18 19a13 13 0 0 0 4-2c0-4-.5-8-3-12zM9 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
)

// Play triangle — stands in for the YouTube mark (Footer wraps it in a red tile).
export const YouTubeGlyph = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M8 5v14l11-7z" />
  </svg>
)
