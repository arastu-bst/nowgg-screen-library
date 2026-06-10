'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { HelpSupportModal } from '@/components/play/HelpSupportModal'
import { RunDiagnosticModal } from '@/components/play/RunDiagnosticModal'

// Style-guide preview for the glass popups. The player's help icon opens Run Diagnostic;
// Help & Support is kept here for reference / future use.
export function PopupPreview() {
  const [open, setOpen] = useState<null | 'help' | 'diag'>(null)
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" size="sm" onClick={() => setOpen('diag')}>Run Diagnostic</Button>
      <Button variant="outline" size="sm" onClick={() => setOpen('help')}>Help &amp; Support</Button>
      {open === 'diag' && <RunDiagnosticModal onClose={() => setOpen(null)} />}
      {open === 'help' && <HelpSupportModal onClose={() => setOpen(null)} />}
    </div>
  )
}
