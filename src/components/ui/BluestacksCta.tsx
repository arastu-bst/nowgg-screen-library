import { cn } from '@/lib/cn'
import { Button } from './Button'

// Cross-brand "BlueStacks by now.gg" download CTA. Part of the now.gg → BlueStacks
// ad-serving experiment: it must be a REAL crawlable external anchor to bluestacks.com
// (Button renders <a> when given `href`), opening in a new tab — NOT a JS button and
// NOT the app-player download. One atom, four placements (TopBar · play hero · Footer ·
// homepage band) so the brand treatment can't drift between them.
//
// Treatment is the SAME everywhere: outline (transparent + white-20 border + white
// text). Pink stays reserved for Play CTAs (taste 2), so this never goes pink. The
// BlueStacks mark is multi-color (white layers + now.gg-pink accent) → it ships as an
// exported <img> asset, NOT the CSS-mask Icon (a mask would flatten it to one color —
// codified 2026-06-11). The white layers need a dark/transparent bg, so no white fill.
const URL = 'https://www.bluestacks.com'
const MARK = '/icons/now-gg/24/developer-resource-bluestacks.svg'
const LABEL = 'BlueStacks by now.gg'

type Context = 'topbar' | 'hero' | 'footer' | 'band'

const PRESET: Record<Context, { size: 'sm' | 'md' | 'lg'; shape: 'rounded' | 'pill'; mark: string; collapse?: boolean }> = {
  topbar: { size: 'sm', shape: 'pill', mark: 'size-4', collapse: true },
  hero: { size: 'md', shape: 'rounded', mark: 'size-5' },
  footer: { size: 'sm', shape: 'pill', mark: 'size-4' },
  band: { size: 'lg', shape: 'rounded', mark: 'size-5' },
}

export function BluestacksCta({ context, className }: { context: Context; className?: string }) {
  const p = PRESET[context]
  return (
    <Button
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline"
      size={p.size}
      shape={p.shape}
      aria-label={`Download ${LABEL}`}
      className={cn('shrink-0', className)}
    >
      {/* multi-color brand mark → exported asset, not a themed Icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARK} alt="" aria-hidden className={cn('shrink-0', p.mark)} />
      {/* anchor text stays in the DOM even when visually collapsed — crawlable */}
      <span className={cn('whitespace-nowrap', p.collapse && 'hidden lg:inline')}>{LABEL}</span>
    </Button>
  )
}
