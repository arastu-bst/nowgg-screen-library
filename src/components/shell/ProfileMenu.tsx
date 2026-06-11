'use client'
import { useState } from 'react'
import { ProfileSidebar } from './ProfileSidebar'

// Client wrapper for the TopBar profile avatar: the avatar is the trigger that opens
// the ProfileSidebar drawer. Lives in the TopBar's right cluster on every page.
export function ProfileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open profile"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="shrink-0 rounded-pill ring-1 ring-line transition-shadow hover:ring-white-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/profile-avatar.png" alt="Your profile" className="size-10 rounded-pill object-cover" />
      </button>
      <ProfileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  )
}
