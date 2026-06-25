'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { NowPrimePopup } from '@/components/play/NowPrimePopup'

// Style-guide preview for the nowPrime upsell popup (the app-page "Play in Browser" gate).
// Same trigger-preview pattern as PopupPreview / ProfileSidebarPreview.
export function NowPrimePopupPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open nowPrime</Button>
      {open && <NowPrimePopup onClose={() => setOpen(false)} />}
    </div>
  )
}
