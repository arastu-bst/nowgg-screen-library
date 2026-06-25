'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

// Design-handoff dev control (fixed bottom-right) to demo the player's flows/states —
// same idea as the WSUP dev togglers. Jumps the GameStage to any state, including the
// nowPrime upsell popup. Portaled to <body> + z-[70] so it stays usable above the popup.
export type PlayState = 'launch' | 'prime' | 'ad' | 'loading' | 'playing'

const STATES: { key: PlayState; label: string }[] = [
  { key: 'launch', label: 'Launch' },
  { key: 'prime', label: 'nowPrime' },
  { key: 'ad', label: 'Ad' },
  { key: 'loading', label: 'Loading' },
  { key: 'playing', label: 'Playing' },
]

export function PlayFlowToggler({ current, onSelect }: { current: PlayState; onSelect: (s: PlayState) => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[70] flex items-center gap-1 rounded-pill border border-white-10 bg-black-80 p-1 shadow-fl-lg backdrop-blur-md">
      <span className="px-2 text-3xs font-semibold uppercase tracking-wide text-white-50">Flow</span>
      {STATES.map((s) => (
        <button
          key={s.key}
          onClick={() => onSelect(s.key)}
          className={cn(
            'rounded-pill px-3 py-1 text-2xs font-medium transition-colors',
            current === s.key ? 'bg-accent text-white' : 'text-white-60 hover:bg-white-10 hover:text-white',
          )}
        >
          {s.label}
        </button>
      ))}
    </div>,
    document.body,
  )
}
