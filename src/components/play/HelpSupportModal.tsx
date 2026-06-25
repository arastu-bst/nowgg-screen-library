'use client'
import { useEffect } from 'react'
import { CloseButton } from '@/components/ui/CloseButton'

// Help & Support popup — opens from the control-bar help icon. Structure/sizing from
// Figma Float—Player 7681:48872 (380px · r12 · fields r6 black-20 · accent checkbox r2);
// content/final state from the live image (#26): Help & Support · single Submit · single
// upload. GLASSY panel (black-30 + backdrop blur; the scrim dims behind). Input states
// from the Float Forms collection (Dark). Design-only.
const label = 'block text-2xs font-semibold uppercase tracking-wide text-text-secondary'
// Float Forms (Dark): default border white-50 → hover white-70 → focus accent; placeholder white-30
const field = 'w-full rounded-r6 border border-white-50 bg-black-20 text-sm text-text-primary outline-none transition-colors placeholder:text-white-30 hover:border-white-70 focus:border-accent'

export function HelpSupportModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Help & Support">
      {/* overlay/scrim — ALWAYS black-70 */}
      <div className="absolute inset-0 bg-black-70" onClick={onClose} aria-hidden />

      {/* glassy panel — white-20 frosted glass (light tint) over the black-70 scrim */}
      <div className="scroll-thin relative z-10 max-h-full w-full max-w-[380px] space-y-6 overflow-y-auto rounded-card border border-line bg-white-20 p-4 shadow-fl-lg backdrop-blur-2xl">
        {/* header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary">Help &amp; Support</h2>
          <CloseButton onClose={onClose} className="-mr-1.5" />
        </div>

        {/* fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className={label}>Email *</label>
            <input readOnly defaultValue="arpit.yadav@bluestacks.com" className={`${field} px-3 py-2`} />
          </div>

          <div className="space-y-1.5">
            <label className={label}>Problem Description *</label>
            <div className="relative rounded-r6 border border-white-50 bg-black-20 p-3 transition-colors hover:border-white-70 focus-within:border-accent">
              <textarea rows={3} placeholder="Use atleast 12 characters to describe the problem you are experiencing" className="w-full resize-none bg-transparent pb-4 text-sm leading-relaxed text-text-primary outline-none placeholder:text-white-30" />
              <span className="pointer-events-none absolute bottom-2.5 right-3 text-3xs font-medium text-text-primary">0 / 200</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={label}>Upload picture or screenshot</label>
            <button type="button" className="flex w-full flex-col items-center justify-center gap-2 rounded-r6 border border-dashed border-line bg-black-20 py-5 text-text-secondary transition-colors hover:border-line-strong hover:text-text-primary">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 16V4m0 0L8 8m4-4l4 4" /><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
              <span className="text-sm font-medium">Upload from device</span>
            </button>
          </div>

          <label className="flex items-center gap-2.5">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-xxs bg-accent">
              <svg viewBox="0 0 24 24" className="size-3 text-text-primary" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l4 4L19 7" /></svg>
            </span>
            <span className="text-2xs text-text-primary">Run a diagnostic report</span>
          </label>
        </div>

        {/* footer */}
        <div className="border-t border-line pt-4">
          <button disabled className="mx-auto block min-w-[210px] cursor-not-allowed rounded-cta-sm bg-neutral px-6 py-2.5 text-2xs font-semibold text-white-40">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
