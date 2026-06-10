'use client'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ICONS, ICON_SIZES, ICON_COUNTS } from '@/lib/icon-library'

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
    </div>
  )
}
