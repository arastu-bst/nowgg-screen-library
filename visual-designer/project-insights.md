# now.gg — Project Insights
Last updated: 2026-06-10 (session 5 — Profile sidebar drawer added; TopBar
backdrop-blur containing-block trap documented)

> Architecture, domain, asset rules, and conventions specific to the now.gg
> replica. Facts a developer/designer needs that aren't taste.

## What this project is
- A **design-only handoff replica** of now.gg (BlueStacks' cloud-gaming portal)
  for developer handoff. Mirrors WSUP's design-only philosophy: **no real
  streaming, no backend, no auth, mock catalog data.** Focus = visual fidelity +
  handoff clarity, NOT working product.
- Scope: **homepage** + **slug-aware play page** (`/play/[slug]` — ONE player
  page opens for any game; no per-game pages) + **/style-guide** living handoff.
- Stack: Next.js 14 (App Router) + React 18 + Tailwind 3.4 + TypeScript, sibling
  to `wsup/`. Tokens in `tailwind.config.ts`; living docs at `/style-guide`.

## Layout architecture
- **App-shell:** fixed `TopBar` (64px, black-70 glass + backdrop-blur + white-10
  hairline) = now.gg logo (40px) + AI search **left-aligned** + flexible spacer +
  right cluster (profile avatar · divider · Ana widget). **NO left nav rail** — an
  early inferred rail was removed (confirmed against Figma node 5315:8426 + live).
  Single **scrollable main column** below the bar.
  - The **profile avatar opens the `ProfileSidebar` glass drawer** (S5); the **Ana
    widget is still non-interactive** (open scope call — wire or leave design-only).
  - ⚠️ **TopBar is a `fixed`-containing block.** Because the header uses
    `backdrop-blur-2xl`, any `position:fixed` overlay rendered as a descendant of the
    TopBar resolves against the 64px header, not the viewport (it collapses). Overlays
    triggered from the header (ProfileSidebar, future menus) MUST `createPortal` to
    `<body>`. Same applies to any ancestor with `filter`/`transform`/`will-change`.
- ⚠️ On the live site the main column is an **inner scroll container** (the window
  itself does NOT scroll). Relevant if anyone re-extracts — window-scroll capture
  misses below-fold content (see `design-source/extract-home-v2.js` for the
  container-aware capture).
- **Grid (from now.gg's own CSS vars):** desktop **9** icon tiles / **5** landscape
  cards per row · mobile **3** / **2** · item margins 8px (icon) / 24px (card).
- **Breakpoints:** mobile **390**, desktop **1440** (note: WSUP uses 414 mobile —
  now.gg is 390).

## Section inventory
- **Homepage:** Top Games (icon grid) · Popular Games (cards) · More Games · Explore
  by Categories (pills) · Short Videos (vertical cards) · Blogs · Top Picks ·
  "What is now.gg" SEO block · Footer.
- **Play page (rebuilt S2 as the cloud-game PLAYER, not a marketing page):**
  player hero filling the first screen (2× 336×280 ad column · 70px recent-games
  rail · 3-state `GameStage` canvas + control bar · 728×90 leaderboard below) ·
  Popular Games · FeaturedBand (unlabeled full-bleed promoted band) · Video Clips ·
  Blogs · Top Picks · More Games · Explore by Categories · Footer.
- **Breadcrumb is the footer's FIRST ROW** (live anatomy, measured S4 via
  `design-source/measure-breadcrumb.js`): trail `<ul>` is a child of `<footer>`,
  24px above the link columns — never a page-body element above the footer.
  Play page only (homepage has no breadcrumb).
- ~80% of components are shared across the two pages.

## Asset rules (now.gg-specific — overrides any WSUP asset rule)
- **Full-color game art + colorful brand logo** — NEVER white-tinted (that's a
  WSUP convention, not now.gg's).
- Real now.gg / CDN asset URLs are allowed (internal BlueStacks product). Remote
  patterns whitelisted in `next.config.js`.

## Brand facts
- Type: **Bricolage Grotesque** (variable 200–800), `icomoon` icon font.
- Accent: `--color-accent: #ff42a5` (their real CSS var).
- Raw extraction lives in `design-source/` (tokens-*.json + screenshots).

## Design-system source — "Float" (Figma file `apmb9PRrJYKc7cNhCUgz7L`)
now.gg's tokens + components come from the shared **Float** design system — NOT a
now.gg-only file. Confirmed shared foundation with WSUP: Float's semantic colors
`#398b4d` (success) and `#de5a48` (error) are identical to WSUP's status tokens.
Implication: token/button decisions here may echo WSUP's system; treat Float as the
canonical source when the live site and a guess disagree. (Variables REST API is
plan-locked — pull specific nodes via figma-console `get_component_for_development`
+ render, or read swatch fills from the node dump.)
