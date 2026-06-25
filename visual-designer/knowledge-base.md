# now.gg — Knowledge Base
Last updated: 2026-06-25 (S7+S8 audit — BlueStacks header CTA, CollectionPanel/GameListRow,
nowPrime popup+CTA+provider, shared CloseButton, frosted-popup pattern, tokens + side-key rule
+ S8 follow-up: cn() made design-system-aware after the border-hair token dropped strokes)

> now.gg's reusable components, patterns, and token hygiene. Format mirrors the
> WSUP knowledge-base convention (each entry: what it is · when to use ·
> **Codified by** · pre-flight check), but content is now.gg's own.

## Component library (BUILT — phases 2–3 complete; live at /style-guide)
Shared shell + section primitives, then page-specific pieces:

- `AppShell` — fixed TopBar + left Rail + scrollable main (`scroll-thin`).
- `TopBar` — logo · centered `SearchBar` (pill) · category icon rail · avatar.
- `Rail` — left vertical icon rail (categories / nav).
- `SectionHeader` — heading + optional "View All" / "Show More" affordance.
- `IconTileGrid` / `GameIconTile` — square game icon (rounded-tile) + label;
  grid cols `tiles` (9) / `tiles-mobile` (3).
- `CardRow` — horizontal carousel (`scroll-hide`), heading + cards.
- `LandscapeGameCard` — landscape art card (Popular Games / Top Picks).
- `CategoryPillGrid` / `CategoryPill` — pill chip + icon (Explore by Categories).
- `VideoClipCard` — vertical (9:16) thumbnail card.
- `BlogCard` — image + title (font 700, 16px).
- `GameHero` — game-page hero (art bg + scrim + title + RatingBadge + GenreChip +
  Play CTA + description/READ MORE/FAQs).
- `RatingBadge` · `GenreChip` · `Button` (variants: primary-pink / ghost-pink /
  text-link) · `AdSlot` (placeholder) · `Footer`.

## Token hygiene
- Every value should resolve to a token in `tailwind.config.ts`. Raw hex/px in a
  className → flag in `scratchpad.md`, migrate at audit.
- Synthesized tokens (hover/press states now.gg renders via JS) are commented as
  `(synthesized)` in the config — don't present them as extracted truth.
- **Spacing convention (codified S4):** classNames use the Tailwind NUMERIC scale
  on the 4px grid (gap-3 = s/12, mb-6 = xl/24, py-10 = xxxl/40). The named Float
  steps (xxxs…xxxl) are the design-side handoff reference (rendered in
  /style-guide → Scales with the numeric mapping). Don't mix scales in classNames.
- **Structural tokens must be WIRED (codified S4):** if a chrome token exists for
  a dim (`header`, `rail`), its consumer must use it — a dead token drifts from
  the truth it encodes (rail said 72px while the live-measured rail was 70px).
  Pre-flight: when adding a structural token, migrate the consumer in the same edit.
- **Style guide prefers REAL components over mockups (codified S4):** wherever a
  component is placement-free, render it live in its section/pattern — inline
  mockups drift (the Breadcrumb mockup was already 3 crumbs vs the real 4).

## Button system (Float — node 11884:41882, file apmb9PRrJYKc7cNhCUgz7L)
now.gg buttons come from the shared **Float** design system. Variants × states
(default/hover/pressed/disabled) × sizes (S/M/L/XL — label Bricolage 600 @ 12/14/16):
- **primary** — bg `accent #ff42a5`, hover **`#ff3392`**, white label; rounded or pill (Play CTAs)
- **secondary** — bg `#e3dfec` lavender, dark-pink label `#c20568`
- **white** — bg white, `black-80` label
- **outline** — transparent, `white-20` border, white label
- **ghost** — transparent, accent border + accent label (Show More)
- **subtle** — bg `white-10`, secondary label
- **neutral** — bg `#565656`, white label (also the disabled base)
- **text** — transparent, `white-70` label (View All)
- **blue-gradient** — blue gradient bg, white label (brand-secondary; NOT yet built)
- **icon buttons** — square (rounded) + round (circle), 4 sizes, glyph (NOT yet built)
Radii: sm r6 · md r8 · lg/xl r12 · pill full. Impl: `src/components/ui/Button.tsx`.

## Player + shell additions (S2–S4)
- `GameStage` — client state machine: launch → ad → loading → playing.
- `PlayerControlBar` — solid black; 40px-tap / 24px-white icons; RECTANGULAR
  buttons (never pills); Remove Ads = Figma SMALL button (gold border r6 + coin).
- `PlayerAds` (2× 336×280) + `AdSlot` (728×90) — exact IAB sizes, square corners,
  centered, never stretched. `PlayerRail` — 70px icon-only recent-games rail.
- `FeaturedBand` — full-bleed white-10 promoted-games band (dev-emphasized lines).
- `HelpSupportModal` / `RunDiagnosticModal` — white-20 frosted glass panel +
  ALWAYS black-70 scrim; inputs use Float `Forms` states.
- `Icon` — CSS-mask renderer for the 419-SVG library (currentColor theming).
- `Footer` — owns the optional breadcrumb trail as its FIRST ROW (`breadcrumb`
  prop, 24px above columns; live anatomy). `Breadcrumb` renders the trail only.
  **Codified by:** S4 (live DOM measured). **Pre-flight:** shell children never
  carry page-level spacing — the container places them (taste rule 14).

## Overlay / drawer additions (S5)
- `ProfileSidebar` (+ `ProfileMenu` trigger) — right-side **glass drawer** opened from
  the TopBar avatar. White-20 frosted panel + black-70 scrim (taste 13), slide-in via
  `translate-x`, **portaled to `<body>`**, Esc + scrim-click close, scrollable middle +
  pinned footer, inner chips `black-20`. **Codified by:** S5.
  **Pre-flight 1 (portal):** any overlay triggered from inside a `backdrop-filter` /
  `filter` / `transform` ancestor (the TopBar is `backdrop-blur-2xl`) MUST portal to
  `<body>` — otherwise that ancestor becomes its containing block and `fixed inset-0`
  collapses to it (the drawer rendered 63px tall until portaled).
  **Pre-flight 2 (no leak):** anything positioned OUTSIDE an off-screen panel (the
  negative-translated notch buttons) stays visible when the panel slides away — gate
  its visibility on the `open` state.
- **Glass overlay** is now a confirmed pattern with **3 consumers** (RunDiagnostic,
  HelpSupport, ProfileSidebar): white-20 frosted panel + ALWAYS black-70 scrim +
  black-20 inner chips. Demoed in `/style-guide` → Patterns ("Popups" + "Profile sidebar").
- `DiscordGlyph` / `YouTubeGlyph` — third-party brand marks extracted to `ui/icons.tsx`
  (S5, Gate 3 at 2 consumers: Footer + ProfileSidebar). Never inline a brand-mark
  `<svg>` again — import the glyph.
- `CloseGlyph` — the close/dismiss X, extracted to `ui/icons.tsx` (S6, Gate 3 at **4**
  consumers: ProfileSidebar ×2 + HelpSupportModal + RunDiagnosticModal). `ui/icons.tsx`
  now holds Star · Chevron · **Close** · Discord · YouTube. **Pre-flight:** never hand-roll
  a close-X `<svg>` inline again — import `CloseGlyph` (size/color via className).

## Profile sidebar pieces (S6 — Figma-accurate)
- **Profile stat chip** (Figma "Stats Row" 26502:58932/59014) — compact **48px** (`h-12`;
  Figma 44, +4 by designer call), `bg-black-20` + `border-white-20` hairline (r12), label
  `text-3xs`(10)/white-70/`leading-3`/`tracking-[0.02em]`, value `text-2xs`(12)/semibold/white,
  `gap-2`. The right-anchored **badge illustration** (frosted tile + glyph, one exported
  Figma SVG) is `absolute inset-y-0 right-0 h-full`; content `pr-10` clears it.
- **Icon rendering rule (codified S6):** monochrome glyph → `currentColor` (the `<Icon>`
  CSS-mask for library SVGs, or an inline `<svg fill="currentColor">`); **multi-color
  illustration → exported Figma SVG in `public/` rendered via `<img>`** — a CSS mask uses
  only alpha and would flatten the colors. The stat badges (`game-cards`/`gold-cauldron`)
  are exported assets, NOT `Icon` names. **Pre-flight:** before rendering, ask "one color
  or many?" and verify it actually renders (the S5 stat icons 404'd at size 32 → invisible).

## Components + patterns (S7–S8)
- `BluestacksCta` (ui/) — header-only cross-brand pill (white-10 + 0.8px white-20 + soft
  shadow, rounded-pill); 32px BlueStacks logo + two-line label ("Download BlueStacks" 15/700
  white over "by now" white-70 + ".gg" accent). A real crawlable `<a href=bluestacks.com>`;
  `sr-only` full label + visible two-line shown `lg+`. **Codified S8.** *(S7's 4-preset
  `context` API + `BluestacksBand` were removed at S8 — header-only now.)*
- `CollectionPanel` + `GameListRow` (game/) — homepage "Football Fever" card: bordered
  surface (`bg-collection-glow` over #111, 0.8px accent border, `rounded-xxl`), 50px header
  (title `text-base`/700 + animated `ai-star.gif` + "View all" `text-2xs`/white-70 + chevron,
  `border-b-[0.8px] border-line`), list of 80px rows (icon `rounded-card` clipped + hover
  zoom + `bg-white-05` hover container; title `text-sm`/white-80 clamp-2; rating pill
  `black-20 rounded-m` + gold star + `toFixed(1)`). xl rail caps the list
  `xl:max-h-[calc(100vh-156px)] xl:overflow-y-auto`. Data: `lib/collections.ts`. **Codified S8.**
- `NowPrimePopup` (play/) — the nowPrime upsell gate (purple `bg-prime-hero` top + looping
  `now-prime-bg.mp4` wash + logo/wordmark + 4 perks; white-20 plan cards; Best Value = absolute
  `bg-prime-badge` pill, white/700/UPPERCASE/0.5px). Buy → `useNowPrime().subscribe()`. **Codified S8.**
- `NowPrimeCta` (ui/) — header nowPrime pill (mirrors BluestacksCta chrome) → opens the popup.
- `PlayFlowToggler` (play/) — portaled bottom-right dev state-selector (Launch · nowPrime · Ad ·
  Loading · Playing); design-handoff control, not product chrome.
- `NowPrimeProvider` (providers/) — root-layout context `{ isPrime, subscribe, cancel }` (design-
  only, resets on refresh). `HeaderLogo` (shell/) reads it → normal logo vs PRIME lockup.
- `CloseButton` (ui/) — **the shared popup close** (Gate-3, 3 consumers: NowPrimePopup,
  HelpSupportModal, RunDiagnosticModal): 20px CloseGlyph in a 36px `rounded-full` hit target,
  white-70 → white + `bg-white-10` hover container. **Pre-flight:** never hand-roll a popup close
  again — import `CloseButton` (position via className).

## Frosted-popup pattern (CANONICAL — codified S8; 4 consumers)
A frosted-glass popup = a SEPARATE `absolute inset-0 bg-black-70` scrim **sibling** (no blur,
onClick close) + `backdrop-blur-2xl` on the **panel itself** (`bg-white-20`). Consumers:
HelpSupportModal, RunDiagnosticModal, ProfileSidebar, NowPrimePopup. **Anti-pattern that FAILS:**
putting the scrim as the *container's background* and the blur on a *child inside an
`overflow-hidden` wrapper* — the blur then has nothing real to sample and reads as invisible
(the S8 nowPrime blur fight). **Pre-flight:** copy a working sibling's structure verbatim.

## Tokens (S8)
- `prime-gold #ffb03c` (color) — nowPrime brand gold (wordmark "Prime" + PRIME tag). bg-gradients
  `prime-hero`, `prime-badge`, `collection-glow`. **Pre-flight:** restart dev server after any
  `tailwind.config.ts` token edit (JIT won't HMR-pick-up).
- `border-hair` (borderWidth 0.8px) — the now.gg hairline (header pills, panel border + dividers).
  `shadow-pill` (header brand pills) · `shadow-plan-card` (nowPrime plan cards). All in
  `tailwind.config.ts`; documented in /style-guide → Scales + Colors.
- `HEADER_PILL` (ui/headerPill.ts) — shared chrome string for the two header brand pills
  (BluestacksCta · NowPrimeCta); each adds its own gap/py. **Pre-flight:** new header pill → reuse it.
- **Style-guide previews of INTERACTIVE components need a `'use client'` wrapper.** The section
  files (ComponentsSection/PatternsSection) are Server Components — passing a function prop
  (e.g. `onClose={() => {}}`) to a client component from there hangs SSG ("functions can't be
  passed to Client Components" → /style-guide static-generation TIMEOUT). Wrap the demo in a
  client preview (PopupPreview · ProfileSidebarPreview · NowPrimePopupPreview · CloseButtonPreview).
  **`next build` catches this; `tsc` does NOT — always build before declaring done.**
- **One-offs (NOT tokenized — exact-1:1-now.gg replication / structural):** the BlueStacks lockup
  type (`text-[15px]`/`leading-[16.5px]`/`text-[11px]`), the PRIME crop-window geometry, popup
  widths (`max-w-[460px]`), `h-[50px]` header, the rail `calc()` cap. Same principled Gate-1
  exception as the IAB ad sizes / 132px icon — snapping them to tokens breaks the pixel match.
- **CONFIG RULE — never use single-letter side-keyword radius keys** (`s·e·t·r·b·l`): they
  collide with Tailwind's built-in `rounded-{side}` utilities → asymmetric radii. Use `r6`/`r10`/
  named keys. (S8: `l`→`r10`, `s`→`r6` after `rounded-l` rendered 4/10/10/4.)
- **`cn()` is DESIGN-SYSTEM-AWARE — mirror every custom Tailwind key in it (codified S8 follow-up).**
  `src/lib/cn.ts` extends tailwind-merge (`extendTailwindMerge`) with our custom scale keys (border
  width `hair`, the named radii / shadows / bg-gradients). WITHOUT this, tailwind-merge mis-buckets a
  custom non-numeric key and SILENTLY DROPS it: `border-hair` was read as a border-*colour*, dropped
  against `border-white-20` / `border-accent`, and the hairline computed to **0px** — every now.gg
  stroke vanished (designer caught "the strokes are gone, why?"). `border-[0.8px]` never had this
  (twMerge parses arbitrary lengths). **Pre-flight:** (1) any new custom key in `tailwind.config.ts`
  (borderWidth/borderRadius/boxShadow/backgroundImage) → add it to the matching group in `cn.ts` the
  SAME edit; (2) after any raw→token migration, verify the computed value on a REAL consumer in the
  running app, NOT a `/style-guide` swatch — the swatch uses a plain string (no `cn()`) so it can't
  surface the drop. Widest-risk case = two classes setting DIFFERENT css props meant to COEXIST
  (width+colour, gradient+bg-colour).

*(Real codified entries accumulate here as components are built and corrected.)*
