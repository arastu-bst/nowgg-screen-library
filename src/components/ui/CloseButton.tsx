import { cn } from '@/lib/cn'
import { CloseGlyph } from './icons'

// Shared popup close — ONE consistent size / colour / behaviour across every popup
// (nowPrime, Help & Support, Run Diagnostic, …). The 20px CloseGlyph sits in a 36px
// circular hit target that lights up (white-10) on hover — the "bounding area" hover
// container. Colour: white-70 → white on hover. Pass `className` to position it.
export function CloseButton({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-white-10 hover:text-text-primary',
        className,
      )}
    >
      <CloseGlyph className="size-5" />
    </button>
  )
}
