import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'white' | 'outline' | 'ghost' | 'subtle' | 'neutral' | 'text'
type Size = 'sm' | 'md' | 'lg' | 'xl'
type Shape = 'rounded' | 'pill'

// Button system — Float design tokens (node 11884:41882). Variant bg/label colors
// match the real Float palette; sizes S/M/L/XL (label 12/14/16); rounded or pill.
// now.gg pages use: primary (Play CTAs), ghost (Show More), text (View All).
// secondary/white/outline/subtle/neutral complete the system for the handoff.
const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:   'bg-accent text-white hover:bg-accent-hover disabled:bg-neutral disabled:text-white-40',
  secondary: 'bg-secondary text-accent-label hover:bg-secondary/90 disabled:opacity-40',
  white:     'bg-white text-black-80 hover:bg-white-90 disabled:opacity-40',
  outline:   'border border-white-20 bg-transparent text-white hover:bg-white-10 disabled:opacity-40',
  ghost:     'border border-accent bg-transparent text-accent hover:bg-accent/10 disabled:opacity-40',
  subtle:    'bg-white-10 text-text-secondary hover:bg-white-20 disabled:opacity-40',
  neutral:   'bg-neutral text-white hover:bg-neutral/90 disabled:opacity-40',
  text:      'bg-transparent text-text-tertiary hover:text-text-primary',
}

const sizes: Record<Size, string> = {
  sm: 'text-2xs px-3 py-1.5', // 12px
  md: 'text-sm px-4 py-2',    // 14px
  lg: 'text-base px-5 py-2.5',// 16px
  xl: 'text-base px-6 py-3',  // 16px, taller
}

const radius: Record<Size, string> = {
  sm: 'rounded-cta-sm',
  md: 'rounded-tile',
  lg: 'rounded-cta',
  xl: 'rounded-cta',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  shape?: Shape
  className?: string
  children: React.ReactNode
}

// Polymorphic: pass `href` and it renders as an anchor (e.g. the external BlueStacks
// CTA needs a real crawlable <a>, not an onClick button); otherwise a <button>.
type ButtonProps = CommonProps & (React.ButtonHTMLAttributes<HTMLButtonElement> | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }))

export function Button({ variant = 'primary', size = 'md', shape = 'rounded', className, children, ...rest }: ButtonProps) {
  const isText = variant === 'text'
  const r = shape === 'pill' ? 'rounded-pill' : radius[size]
  const cls = cn(base, variants[variant], !isText && sizes[size], !isText && r, className)
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
