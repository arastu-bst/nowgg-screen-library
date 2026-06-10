'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

// Run Diagnostic popup — opens from the control-bar help icon. Same glass as Help &
// Support (white-20 panel + black-70 scrim). Three states: idle → running → done.
// Design-only (the checks are a simulated loader).
const TOTAL = 18
const CHECKS = [
  'Checking network connection',
  'Verifying streaming server',
  'Testing device compatibility',
  'Checking display & audio',
  'Validating input & controls',
  'Inspecting game session',
]

export function RunDiagnosticModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'running' | 'done' | 'sent'>('idle')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  // after the report is sent, show the confirmation briefly, then close
  useEffect(() => {
    if (phase !== 'sent') return
    const t = setTimeout(onClose, 2200)
    return () => clearTimeout(t)
  }, [phase, onClose])

  // simulated run: tick the counter 0→18, then resolve to "done"
  useEffect(() => {
    if (phase !== 'running') return
    if (count >= TOTAL) {
      const t = setTimeout(() => setPhase('done'), 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount((c) => c + 1), 180)
    return () => clearTimeout(t)
  }, [phase, count])

  const pct = (count / TOTAL) * 100
  const current = CHECKS[Math.min(CHECKS.length - 1, Math.floor((count / TOTAL) * CHECKS.length))]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Run Diagnostic">
      {/* overlay/scrim — ALWAYS black-70 */}
      <div className="absolute inset-0 bg-black-70" onClick={onClose} aria-hidden />

      {/* glassy panel — white-20 frosted glass */}
      <div className="relative z-10 w-full max-w-[380px] space-y-5 rounded-card border border-line bg-white-20 p-5 shadow-fl-lg backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary">Run Diagnostic</h2>
          <button onClick={onClose} aria-label="Close" className="text-text-tertiary transition-colors hover:text-text-primary">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {phase === 'idle' && (
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-text-secondary">
              Run a quick set of checks on your connection, device, and current game session. We&apos;ll bundle the
              results into a report you can send to support.
            </p>
            <Button variant="primary" size="lg" className="w-full justify-center" onClick={() => { setCount(0); setPhase('running') }}>
              Run Diagnostics
            </Button>
          </div>
        )}

        {phase === 'running' && (
          <div className="space-y-4 py-2">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="size-9 animate-spin rounded-full border-2 border-white-20 border-t-accent" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-text-primary">Running diagnostics…</p>
                <p className="mt-0.5 text-2xs text-text-tertiary">{current}…</p>
              </div>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-pill bg-white-10">
              <div className="h-full rounded-pill bg-accent transition-all duration-150 ease-linear" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-center text-2xs font-medium text-text-tertiary">{count} / {TOTAL} checks</p>
          </div>
        )}

        {phase === 'done' && (
          <div className="space-y-5">
            <div className="flex flex-col items-center gap-3 py-2 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-status-success/20">
                <svg viewBox="0 0 24 24" className="size-6 text-status-success" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l4 4L19 7" /></svg>
              </span>
              <div>
                <p className="text-base font-bold text-text-primary">Done — all steps clear</p>
                <p className="mt-1 text-2xs text-text-tertiary">No issues found in your setup.</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 rounded-s border border-line bg-black-20 py-2.5 text-2xs font-medium">
              <span className="text-status-success">{TOTAL} passed</span>
              <span className="text-text-dim">·</span>
              <span className="text-text-tertiary">0 blocked</span>
              <span className="text-text-dim">·</span>
              <span className="text-text-tertiary">0 other</span>
            </div>
            <Button variant="primary" size="lg" className="w-full justify-center" onClick={() => setPhase('sent')}>Send Report</Button>
          </div>
        )}

        {phase === 'sent' && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-accent/20">
              <svg viewBox="0 0 24 24" className="size-6 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l4 4L19 7" /></svg>
            </span>
            <div>
              <p className="text-base font-bold text-text-primary">Report sent</p>
              <p className="mt-1 text-sm text-text-secondary">Thanks — our team will take a look and follow up if needed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
