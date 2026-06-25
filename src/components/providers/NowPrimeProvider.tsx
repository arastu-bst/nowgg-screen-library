'use client'
import { createContext, useContext, useState } from 'react'

// Global nowPrime subscription state (design-only — no real payment). `subscribe()` flips
// the user to "nowPrime'd"; the header logo then shows the gold PRIME lockup. Shared by
// the popup (Buy → subscribe) and the TopBar logo (reads isPrime). Provided at the root
// layout so it reaches the header, the play page, and the portaled popup alike.
type NowPrimeCtx = { isPrime: boolean; subscribe: () => void; cancel: () => void }

const NowPrimeContext = createContext<NowPrimeCtx>({ isPrime: false, subscribe: () => {}, cancel: () => {} })

export function NowPrimeProvider({ children }: { children: React.ReactNode }) {
  const [isPrime, setIsPrime] = useState(false)
  return (
    <NowPrimeContext.Provider value={{ isPrime, subscribe: () => setIsPrime(true), cancel: () => setIsPrime(false) }}>
      {children}
    </NowPrimeContext.Provider>
  )
}

export const useNowPrime = () => useContext(NowPrimeContext)
