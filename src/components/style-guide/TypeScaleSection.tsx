// now.gg UI scale + Float Title display scale (Bricolage Grotesque).
const SCALE: { cls: string; px: string; note: string }[] = [
  { cls: 'text-6xl', px: '72', note: 'Flow Title' },
  { cls: 'text-5xl', px: '64', note: 'Title 5XL' },
  { cls: 'text-4xl', px: '48', note: 'Title 4XL' },
  { cls: 'text-3xl', px: '36', note: 'Title 3XL' },
  { cls: 'text-2xl', px: '32', note: 'Large section heading' },
  { cls: 'text-xl', px: '24', note: 'Section heading / game title' },
  { cls: 'text-lg', px: '20', note: 'Section heading (compact)' },
  { cls: 'text-base', px: '16', note: 'Subtitle / blog title' },
  { cls: 'text-sm', px: '14', note: 'Body / card title / CTA' },
  { cls: 'text-xs', px: '13', note: 'Dense secondary' },
  { cls: 'text-2xs', px: '12', note: 'Small label' },
  { cls: 'text-3xs', px: '10', note: 'Tile label / meta' },
]

export function TypeScaleSection() {
  return (
    <div className="divide-y divide-line">
      {SCALE.map((s) => (
        <div key={s.cls} className="flex items-baseline gap-6 py-3">
          <div className="w-28 shrink-0 font-mono text-2xs text-text-dim">
            {s.px}px <span className="text-text-faint">· {s.cls}</span>
          </div>
          <p className={`${s.cls} truncate font-semibold text-text-primary`}>Bricolage Grotesque</p>
          <span className="ml-auto hidden shrink-0 text-2xs text-text-muted md:block">{s.note}</span>
        </div>
      ))}
    </div>
  )
}
