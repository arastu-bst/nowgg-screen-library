'use client'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ICONS, ICON_SIZES, ICON_COUNTS } from '@/lib/icon-library'
import { StarIcon, ChevronRight, CloseGlyph, DiscordGlyph, YouTubeGlyph } from '@/components/ui/icons'

// Inline glyphs hand-authored in ui/icons.tsx (currentColor) for marks the Float
// library has no clean equivalent for. Catalogued here so they're discoverable.
const INLINE_GLYPHS = [
  { name: 'StarIcon', El: StarIcon },
  { name: 'ChevronRight', El: ChevronRight },
  { name: 'CloseGlyph', El: CloseGlyph },
  { name: 'DiscordGlyph', El: DiscordGlyph },
  { name: 'YouTubeGlyph', El: YouTubeGlyph },
]

// The now.gg / Float icon library, exported live from Figma at 4 sizes. Tabs switch
// the rendered size. Icons keep their designed fills (built for dark UI), shown on
// faint tiles.
export function IconLibrarySection() {
  const [size, setSize] = useState<number>(24)
  const list = ICONS[size] || []
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {ICON_SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={cn(
              'rounded-pill border px-3 py-1.5 text-2xs font-semibold transition-colors',
              size === s ? 'border-accent bg-accent/15 text-accent' : 'border-line text-text-tertiary hover:text-text-primary',
            )}
          >
            {s}px <span className="text-text-dim">({ICON_COUNTS[s as keyof typeof ICON_COUNTS]})</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(74px,1fr))] gap-2">
        {list.map((ic) => (
          <div
            key={ic.file}
            title={ic.name}
            className="flex flex-col items-center gap-1.5 rounded-m border border-line bg-fill-subtle p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/icons/now-gg/${size}/${ic.file}.svg`} alt={ic.name} className="size-7 object-contain" loading="lazy" />
            <span className="w-full truncate text-center text-3xs text-text-dim">{ic.name}</span>
          </div>
        ))}
      </div>

      {/* Inline glyphs — hand-authored in ui/icons.tsx (currentColor), for marks the library lacks. */}
      <div className="space-y-3 border-t border-line pt-5">
        <p className="text-2xs font-semibold uppercase tracking-wider text-text-tertiary">
          Inline glyphs <span className="font-normal normal-case text-text-dim">· ui/icons.tsx · currentColor</span>
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(74px,1fr))] gap-2">
          {INLINE_GLYPHS.map((g) => (
            <div key={g.name} title={g.name} className="flex flex-col items-center gap-1.5 rounded-m border border-line bg-fill-subtle p-2 text-text-primary">
              <g.El className="size-7" />
              <span className="w-full truncate text-center text-3xs text-text-dim">{g.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
