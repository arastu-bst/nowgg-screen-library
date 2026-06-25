'use client'
import Link from 'next/link'
import { ASSETS } from '@/lib/mock-data'
import { useNowPrime } from '@/components/providers/NowPrimeProvider'

// Header logo. Default = the plain now.gg logo. Once nowPrime'd (subscribed via the
// popup) it becomes the PRIME lockup.
//
// The now.gg logo is ONE combined SVG (dot + "now.gg"). For PRIME we need the dot and the
// wordmark as separate pieces so the gold "PRIME" can sit tight under JUST the wordmark
// and the dot can vertically-center against the (wordmark + PRIME) block. We do that
// WITHOUT new assets — two overflow-hidden "windows" crop the same logo image:
//   dot      → viewBox x0–48, y7.5–42  (measured via getBBox)
//   wordmark → viewBox x60–155, y18–36
// at the full-logo render height of 40px (scale 0.8): 1 unit = 0.8px.
export function HeaderLogo() {
  const { isPrime } = useNowPrime()

  if (!isPrime) {
    return (
      <Link href="/" aria-label="now.gg home" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.logo} alt="now.gg" className="h-10 w-auto" />
      </Link>
    )
  }

  return (
    <Link href="/" aria-label="now.gg PRIME — home" className="flex shrink-0 items-center gap-2">
      {/* logoart (dot) — left crop of the combined logo */}
      <span className="block h-[28px] w-[39px] shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.logo} alt="now.gg" className="h-10 max-w-none -mt-[6px]" />
      </span>
      {/* wordmark + PRIME, stacked; the dot above is centered against this block */}
      <span className="flex flex-col">
        <span className="block h-[15px] w-[76px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.logo} alt="" aria-hidden className="h-10 max-w-none -ml-[48px] -mt-[14px]" />
        </span>
        <span className="mt-[2px] text-[10px] font-extrabold uppercase leading-none tracking-[0.3em] text-prime-gold">
          PRIME
        </span>
      </span>
    </Link>
  )
}
