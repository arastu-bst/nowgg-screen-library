import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge only understands Tailwind's BUILT-IN scales. Every CUSTOM theme key we add
// in tailwind.config (a name that's neither a number nor an arbitrary value) is invisible to
// it — so when such a class shares an element with a sibling from the same property family,
// twMerge can mis-bucket and SILENTLY DROP it. That's exactly how `border-hair` lost its
// width and the now.gg strokes vanished: twMerge read it as a border-COLOR, saw the real
// `border-white-20`, and dropped the width. The cure is to mirror our custom keys here so
// cn() stays design-system-aware. KEEP THESE LISTS IN SYNC WITH tailwind.config.ts.
const RADIUS = ['xxs', 'xs', 'r6', 'm', 'r10', 'xxl', 'sm', 'tile', 'cta-sm', 'card', 'cta', 'xl', 'pill']
const SHADOW = ['card', 'soft', 'drop', 'pill', 'plan-card', 'glow', 'glow-hover', 'fl-sm', 'fl-md', 'fl-lg', 'fl-dark', 'fl-button']
const BG_IMAGE = [
  'glow-corner', 'glow-page', 'gradient-ai', 'gradient-ring', 'player-bar', 'ad-loader',
  'widget-bar', 'hero-scrim', 'hero-scrim-x', 'collection-glow', 'prime-hero', 'prime-badge',
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // The hairline width — the one that actually bit us (width vs colour collision).
      'border-w': [{ border: ['hair'] }],
      'border-w-x': [{ 'border-x': ['hair'] }],
      'border-w-y': [{ 'border-y': ['hair'] }],
      'border-w-t': [{ 'border-t': ['hair'] }],
      'border-w-r': [{ 'border-r': ['hair'] }],
      'border-w-b': [{ 'border-b': ['hair'] }],
      'border-w-l': [{ 'border-l': ['hair'] }],
      // The rest: not colliding today, but registered so a future `cn()` can never drop them
      // (gradient + bg-colour is the same width-vs-colour trap waiting to happen).
      rounded: [{ rounded: RADIUS }],
      shadow: [{ shadow: SHADOW }],
      'bg-image': [{ bg: BG_IMAGE }],
    },
  },
})

/** Merge Tailwind class names with conflict resolution (design-system-aware — see above). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
