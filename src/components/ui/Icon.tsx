import { cn } from '@/lib/cn'

type IconSize = 16 | 24 | 32 | 40

// Renders a real now.gg / Float library icon (public/icons/now-gg/<size>/<name>.svg)
// as a `currentColor` mask — the library SVGs ship with baked fills, so masking lets
// any icon theme to the surrounding text color (e.g. white on the player bar, accent
// on the My Games row). Size the box via className (e.g. `size-5`); pick the `size`
// source closest to the rendered px for crispness.
export function Icon({ name, size = 24, className }: { name: string; size?: IconSize; className?: string }) {
  const url = `/icons/now-gg/${size}/${name}.svg`
  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}
