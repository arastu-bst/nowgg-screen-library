import { ASSETS } from '@/lib/mock-data'

// "Ai Search" (Figma 5315:8426 / 5314:6732): WHITE bg, radius 8, purple→teal
// gradient border (1px), 40px tall. Sits LEFT next to the logo (not centered).
// Gradient search glyph + dark-70% placeholder + "Powered by AI" 10px + ✨.
export function SearchBar() {
  return (
    <div className="w-full min-w-0 max-w-[400px] rounded-tile bg-gradient-ai p-px">
      <div className="flex h-10 items-center gap-2 rounded-[7px] bg-white px-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.search} alt="" aria-hidden className="size-4 shrink-0" />
        <input
          placeholder="Search | e.g. roblox"
          className="h-full w-full min-w-0 bg-transparent text-sm text-black-80 placeholder:text-black-70 focus:outline-none"
        />
        <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
          <span className="whitespace-nowrap text-3xs text-black-70">Powered by AI</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.stars} alt="" aria-hidden className="size-3.5" />
        </div>
      </div>
    </div>
  )
}
