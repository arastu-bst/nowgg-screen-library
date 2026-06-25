'use client'
import { CloseButton } from '@/components/ui/CloseButton'

// Style-guide preview wrapper — supplies the (no-op) onClose handler CLIENT-side so the
// CloseButton demo can render inside the server-rendered ComponentsSection (a Server
// Component can't pass a function prop across the boundary).
export function CloseButtonPreview() {
  return <CloseButton onClose={() => {}} />
}
