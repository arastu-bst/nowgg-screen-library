// [Float step, px, Tailwind numeric equivalent] — the CODE CONVENTION is the
// numeric scale (gap-3, py-10, …); the named steps are the Float handoff reference.
const SPACING: [string, number, string][] = [
  ['xxxs', 2, '0.5'], ['xxs', 4, '1'], ['xs', 8, '2'], ['s', 12, '3'], ['m', 16, '4'], ['l', 20, '5'], ['xl', 24, '6'], ['xxl', 32, '8'], ['xxxl', 40, '10'],
]
const RADIUS: [string, number][] = [
  ['xxs', 2], ['xs', 4], ['s', 6], ['m', 8], ['l', 10], ['xl', 12], ['xxl', 16],
]
const SHADOWS: [string, string][] = [
  ['shadow-fl-sm', 'Shadow / Small'], ['shadow-fl-md', 'Shadow / Normal'], ['shadow-fl-lg', 'Shadow / Big'],
  ['shadow-fl-dark', 'Shadow / Dark'], ['shadow-fl-button', 'Button shadow'], ['shadow-card', 'Card'], ['shadow-glow', 'Glow (inset)'],
]

export function ScalesSection() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-tertiary">Spacing</h3>
        <div className="space-y-2">
          {SPACING.map(([k, px, tw]) => (
            <div key={k} className="flex items-center gap-4">
              <span className="w-12 shrink-0 font-mono text-2xs text-text-dim">{k}</span>
              <div className="h-4 rounded-xs bg-accent" style={{ width: px }} />
              <span className="w-12 shrink-0 font-mono text-2xs text-text-faint">{px}px</span>
              <span className="font-mono text-2xs text-text-faint">≙ -{tw} <span className="text-text-dim">(p-{tw} / gap-{tw})</span></span>
            </div>
          ))}
          <p className="pt-1 text-2xs text-text-faint">
            Code convention: the Tailwind numeric scale on the same 4px grid — named Float steps are the design-side reference.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-tertiary">Radius</h3>
        <div className="flex flex-wrap gap-5">
          {RADIUS.map(([k, px]) => (
            <div key={k} className="flex flex-col items-center gap-1.5">
              <div className="size-16 border border-line bg-fill-soft" style={{ borderRadius: px }} />
              <span className="font-mono text-2xs text-text-dim">{k} · {px}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-tertiary">Elevation</h3>
        <div className="flex flex-wrap gap-6">
          {SHADOWS.map(([cls, label]) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <div className={`size-16 rounded-card bg-surface ${cls}`} />
              <span className="text-2xs text-text-dim">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
