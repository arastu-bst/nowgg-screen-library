import type { Article } from '@/lib/mock-data'

// Wide content card (Blogs + Top Picks): 16:9 rounded cover + title BELOW (no card
// chrome, no eyebrow). Hover → 1px pink→purple gradient ring + slight cover zoom.
export function FeatureCard({ article }: { article: Article }) {
  return (
    <a className="group block">
      <div className="relative aspect-video">
        <span className="pointer-events-none absolute -inset-px rounded-[13px] bg-accent-hot opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
        <div className="relative size-full overflow-hidden rounded-card border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.cover} alt="" aria-hidden className="size-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
      </div>
      <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-text-primary">{article.title}</h3>
    </a>
  )
}
