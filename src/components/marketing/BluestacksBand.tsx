import { BluestacksCta } from '@/components/ui/BluestacksCta'

// Homepage promo band for the now.gg → BlueStacks cross-brand CTA. Marketing surfaces
// are first-class on now.gg (taste 8). The homepage is one constrained column, so this
// is a CONTAINED rounded band (taste 16: surfaces floating inside padding get radius —
// a viewport-bleed band fights the scroll gutter), white-10 like the play-page bands.
// The big mark + headline carry the prominence; the CTA stays the quiet shared outline.
export function BluestacksBand() {
  return (
    <section className="overflow-hidden rounded-card border border-line bg-white-10 px-6 py-8 md:px-10 md:py-9">
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/now-gg/24/developer-resource-bluestacks.svg" alt="" aria-hidden className="hidden size-12 shrink-0 sm:block" />
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Play even bigger on PC</h2>
            <p className="mt-1 max-w-xl text-sm text-text-primary/70">
              Get the full BlueStacks experience — thousands of Android games on a bigger screen, with better controls.
            </p>
          </div>
        </div>
        <BluestacksCta context="band" />
      </div>
    </section>
  )
}
