'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ProfileSidebar } from '@/components/shell/ProfileSidebar'

// Style-guide preview for the Profile sidebar (glass drawer). Opens from the TopBar
// avatar in the app; here a trigger button stands in for it.
export function ProfileSidebarPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open Profile sidebar</Button>
      <ProfileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  )
}
