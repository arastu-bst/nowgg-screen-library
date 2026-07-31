'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { CloseButton } from '@/components/ui/CloseButton'
import { useNowPrime } from '@/components/providers/NowPrimeProvider'
import { PERKS, PLANS, REGION_NOTE, type Plan } from '@/lib/now-prime'

// nowPrime subscription workflow — a 3-step overlay portaled to <body> (taste 13: black-70
// scrim + white-20 frosted panel). TOP = purple gradient (bg-prime-hero) with the real
// now-prime-bg.mp4 wash + logo/wordmark + perks. BOTTOM swaps per step:
//   select   → the 3 plan cards (Daily/Weekly one-time · Monthly = Best Value subscription)
//   checkout → plan summary + Stripe hand-off (the real product opens Stripe checkout)
//   done     → confirmation; subscribe(plan) has flipped the header logo to PRIME.
type Step = 'select' | 'checkout' | 'done'

export function NowPrimePopup({ onClose }: { onClose: () => void }) {
  const { subscribe } = useNowPrime()
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('select')
  const [selected, setSelected] = useState<Plan | null>(null)

  useEffect(() => {
    setMounted(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  if (!mounted) return null

  const choose = (pl: Plan) => { setSelected(pl); setStep('checkout') }
  const confirm = () => { if (selected) subscribe(selected); setStep('done') }

  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black-70" aria-hidden />
      <div className="relative flex min-h-full items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-card shadow-fl-lg backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
        {/* ── TOP: purple gradient + animated wash + logo/wordmark + perks ── */}
        <div className="relative overflow-hidden bg-prime-hero px-5 py-5 sm:px-8">
          <video
            src="/now-prime-bg.mp4"
            autoPlay loop muted playsInline aria-hidden
            onEnded={(e) => { const v = e.currentTarget; v.currentTime = 0; void v.play().catch(() => {}) }}
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-20 mix-blend-lighten"
          />
          <CloseButton onClose={onClose} className="absolute right-3 top-3 z-[2]" />
          <div className="relative z-[1] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/now-gg/now-prime-logo.webp" alt="" aria-hidden className="size-6" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/now-gg/now-prime-text.webp" alt="nowPrime" className="-mt-0.5 h-5 w-auto" />
            </div>
            {step === 'select' && (
              <ul className="flex flex-col gap-2">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-semibold text-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icons/now-gg/tick.svg" alt="" aria-hidden className="size-[15px] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── BOTTOM: white-20 (wrapper backdrop-blur shows through) ── */}
        <div className="bg-white-20 px-5 pb-6 pt-4 sm:px-8">
          {step === 'select' && <SelectStep onChoose={choose} />}
          {step === 'checkout' && selected && (
            <CheckoutStep plan={selected} onBack={() => setStep('select')} onConfirm={confirm} />
          )}
          {step === 'done' && selected && <DoneStep plan={selected} onClose={onClose} />}
        </div>
      </div>
      </div>
    </div>,
    document.body,
  )
}

// ── Step 1: choose a plan ──
function SelectStep({ onChoose }: { onChoose: (p: Plan) => void }) {
  return (
    <>
      <p className="text-sm font-semibold text-white-70">Choose your plan</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        {PLANS.map((pl) => (
          <div
            key={pl.id}
            className={cn(
              'relative flex w-full flex-col items-center rounded-m bg-white px-3 pb-3 pt-4 text-center shadow-plan-card sm:w-auto sm:flex-1',
              pl.best && 'ring-2 ring-prime-gold',
            )}
          >
            {pl.best && (
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-pill bg-prime-badge px-2.5 py-[5px] text-3xs font-bold uppercase leading-none tracking-wide text-white">
                Best Value
              </span>
            )}
            <p className={cn('text-sm font-bold', pl.titleColor)}>{pl.name}</p>
            {/* was + off on one line; reserved height keeps prices aligned across cards */}
            <div className="mt-1 flex h-4 items-center justify-center gap-1.5 leading-none">
              {pl.original && <span className="text-[11px] font-medium text-status-alert line-through">{pl.original}</span>}
              {pl.off && <span className="text-[11px] font-semibold text-logo-green">{pl.off}</span>}
            </div>
            <p className="mt-1 text-xl font-bold text-black-80">{pl.price}</p>
            <p className="mt-0.5 text-3xs font-medium text-black-40">{pl.billing}</p>
            {/* reserved so the button aligns whether or not there's a save line */}
            <p className="h-3.5 text-3xs font-semibold leading-none text-logo-green">{pl.saveVsDaily ?? ''}</p>
            <button
              onClick={() => onChoose(pl)}
              className="mt-3 w-full rounded-cta-sm bg-accent px-3 py-2 text-2xs font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              {pl.cta}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-3 text-3xs leading-4 text-white-50">*{REGION_NOTE}</p>
    </>
  )
}

// ── Step 2: Stripe hand-off ──
function CheckoutStep({ plan, onBack, onConfirm }: { plan: Plan; onBack: () => void; onConfirm: () => void }) {
  return (
    <>
      <button onClick={onBack} className="text-2xs font-medium text-white-60 transition-colors hover:text-white">
        ← Back to plans
      </button>
      <div className="mt-3 rounded-m border border-white-20 bg-black-20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white">{plan.name} Pass</p>
            <p className="text-2xs text-white-60">{plan.billing}</p>
          </div>
          <p className="text-lg font-semibold text-white">
            {plan.price}
            {plan.isSubscription && <span className="text-2xs font-medium text-white-60">/mo</span>}
          </p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-3xs leading-4 text-white-50">
        <LockGlyph className="size-3 shrink-0" />
        You&apos;ll be securely redirected to Stripe to complete payment.
      </p>
      <button
        onClick={onConfirm}
        className="mt-4 w-full rounded-cta-sm bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        {plan.isSubscription ? `Subscribe · ${plan.price}/mo` : `Pay ${plan.price}`}
      </button>
    </>
  )
}

// ── Step 3: confirmation ──
function DoneStep({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <div className="flex size-12 items-center justify-center rounded-pill bg-prime-badge">
        <CheckGlyph className="size-6 text-white" />
      </div>
      <p className="mt-3 text-base font-bold text-white">You&apos;re all set</p>
      <p className="mt-1 text-2xs leading-4 text-white-60">
        nowPrime is active on your {plan.name} plan. Enjoy ad-free play across every device.
      </p>
      <button
        onClick={onClose}
        className="mt-4 w-full rounded-cta-sm bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Start playing ad-free
      </button>
    </div>
  )
}

function LockGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  )
}

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
