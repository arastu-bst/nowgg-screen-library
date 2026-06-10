'use client'
import { useState } from 'react'
import { cn } from '@/lib/cn'

// FAQ accordion (Figma 5316:8747): numbered questions, each a separate rounded bar
// (gray fill, chevron, white-20 border when open). Q1 answer is now.gg's real copy;
// Q2/Q3 answers are written to match (Figma had placeholder bodies for collapsed).
const FAQS = [
  { q: 'What games can you play with friends online?', a: 'We have new multiplayer-friendly online games launching daily on now.gg like MU Origin 3, World of Tanks Blitz, League of Angels: Chaos, and many more. You can play games with friends and make enduring memories, from cooperative adventures to competitive challenges.' },
  { q: 'Do you need to upload or download online games?', a: 'No — there are no downloads or installs. Games stream from the cloud and run instantly in your browser, so you can start playing in seconds on any device.' },
  { q: 'Where can I play free games online without downloading them?', a: 'Right here on now.gg. Browse thousands of free titles across every genre and click to play instantly — no download, no install, no waiting.' },
]

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4 shrink-0 text-text-tertiary transition-transform duration-200', open && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col gap-1">
      {FAQS.map((f, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            className={cn(
              'rounded-tile bg-fill-bar px-4 py-3 backdrop-blur-sm transition-colors',
              isOpen ? 'border border-white-20' : 'border border-transparent',
            )}
          >
            <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-3 text-left">
              <span className="flex-1 text-base font-semibold text-text-tertiary">
                {String(i + 1).padStart(2, '0')}. {f.q}
              </span>
              <Chevron open={isOpen} />
            </button>
            {isOpen && <p className="mt-2 text-base leading-snug text-text-muted">{f.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
