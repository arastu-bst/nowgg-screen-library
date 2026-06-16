import { BluestacksCta } from '@/components/ui/BluestacksCta'

// Promo band for the now.gg → BlueStacks cross-brand CTA, used on the homepage AND the
// app/play page. Marketing surfaces are first-class on now.gg (taste 8). It's a
// CONTAINED rounded band (taste 16: a surface floating inside the content column gets
// radius) — it lives inside each page's max-w-content column, so it reads identically
// on both. The page wrappers own the rhythm around it (taste 14).
export function BluestacksBand() {
  return (
    <section className="flex flex-col items-start gap-5 overflow-hidden rounded-card border border-line bg-white-10 px-6 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-9">
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
    </section>
  )
}
