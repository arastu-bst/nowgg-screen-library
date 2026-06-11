# now.gg — Knowledge Base
Last updated: 2026-06-11 (session 6 audit — CloseGlyph extracted (Gate 3 at 4); profile
stat-chip anatomy + icon-vs-illustration render rule codified)

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

*(Real codified entries accumulate here as components are built and corrected.)*
