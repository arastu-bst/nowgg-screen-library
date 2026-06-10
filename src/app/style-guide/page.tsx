import { ColorsSection } from '@/components/style-guide/ColorsSection'
import { TypeScaleSection } from '@/components/style-guide/TypeScaleSection'
import { ScalesSection } from '@/components/style-guide/ScalesSection'
import { IconLibrarySection } from '@/components/style-guide/IconLibrarySection'
import { ComponentsSection } from '@/components/style-guide/ComponentsSection'
import { PatternsSection } from '@/components/style-guide/PatternsSection'

const SECTIONS = [
  { id: 'colors', title: 'Colors', el: <ColorsSection /> },
  { id: 'type', title: 'Type scale', el: <TypeScaleSection /> },
  { id: 'scales', title: 'Spacing · Radius · Elevation', el: <ScalesSection /> },
  { id: 'icons', title: 'Icon library', el: <IconLibrarySection /> },
  { id: 'components', title: 'Components', el: <ComponentsSection /> },
  { id: 'patterns', title: 'Patterns', el: <PatternsSection /> },
]

// /style-guide — a living reference for the now.gg replica, built on the FLOAT
// design system extracted live from Figma (design-source/figma/design-system/).
export default function StyleGuidePage() {
  return (
    <div className="relative min-h-screen bg-page-bg">
      <div className="pointer-events-none fixed inset-0 z-0 bg-glow-page" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-12">
        <header className="border-b border-line pb-6">
          <p className="text-2xs font-semibold uppercase tracking-wider text-accent">now.gg · Float</p>
          <h1 className="mt-1 text-4xl font-bold text-text-primary">Style Guide</h1>
          <p className="mt-2 max-w-xl text-sm text-text-tertiary">
            Extracted live from the Float Figma library via the Desktop Bridge — 6 token collections (130 variables),
            29 text styles, 13 effect styles, 419 icons across 4 sizes, 221 components + 109 sets. Design-only handoff replica.
          </p>
          <nav className="mt-5 flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-pill border border-line px-3 py-1.5 text-2xs font-semibold text-text-tertiary transition-colors hover:border-accent hover:text-accent">
                {s.title}
              </a>
            ))}
          </nav>
        </header>

        <div className="mt-10 space-y-16">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-6">
              <h2 className="mb-6 text-2xl font-semibold text-text-primary">{s.title}</h2>
              {s.el}
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-line pt-6 text-2xs text-text-dim">
          Source: Figma <span className="font-mono">apmb9PRrJYKc7cNhCUgz7L</span> (Float). Tokens →
          <span className="font-mono"> design-source/figma/design-system/</span> · Icons →
          <span className="font-mono"> public/icons/now-gg/</span>.
        </footer>
      </div>
    </div>
  )
}
