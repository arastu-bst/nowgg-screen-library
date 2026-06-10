# now.gg — design → developer handoff

This replica is **visual fidelity only**. Below: each screen broken down, the component
inventory, the player's states, the design tokens/icons, and exactly where real systems
plug in. Pair with `/style-guide` (rendered system) and
`design-source/figma/design-system/` (raw token extraction).

---

## 1. Homepage (`/` → `app/page.tsx` in `AppShell`)

Single scrolling column under a fixed dark-glass top bar (no left nav). Sections, in order:

1. **My Games** row — `MyGamesRow` (recently-played circular tiles + tooltip).
2. **Top Games** — `IconTileGrid` (9-up desktop / 3-up mobile) + "Show More".
3. **Popular Games** — `PosterCard` grid (portrait 3:4, rating badge on hover), "View All".
4. **More Games** — `IconTileGrid` + "Show More".
5. **Explore by Categories** — `CategoryChips` (rounded chips + per-category pink icons).
6. **Enjoy some Short videos** — `VideoClipCard` grid (2:3, caption below, hover play).
7. **Blogs** / **Top Picks** — `FeatureCard` 3-up (16:9 cover + title below).
8. **About** (`AboutSection`) + **FAQ** (`FaqAccordion`) + **Footer**.

Tile interaction is uniform: **1px `accent-hot` hover ring + ~5% image zoom**.

## 2. Game player (`/play/[slug]` → `app/play/[slug]/page.tsx`)

One slug-aware page opens for **any** game (falls back to Little Alchemy 2 — see
`lib/play.ts`). Layout: TopBar · player hero (fills first screen) · content sections ·
breadcrumb · footer.

**Player hero** (`p.tsx` composes):
- `PlayerAds` — left column, **2× 336×280 Large Rectangle** ad units + "Ads help keep
  now.gg Free!" divider (real creatives supplied; swap freely).
- `PlayerRail` — 70px vertical strip of recent-game icons (70×70, r4).
- `GameStage` — the canvas (see states below).
- `AdSlot` — **728×90 Leaderboard** centered under the canvas.

**`GameStage` — 3 states (client state machine, driven by "Play in Browser"):**
| State | What renders |
|---|---|
| `launch` | `Launch_1920.mp4` bg + **70% black scrim** + game icon (132/r12) · title · ★rating · dev · genre · category pill · pink **Play in Browser** CTA · SEO blurb. **No bottom bar.** |
| `ad` | `PlayerAdScreen` — pre-roll ad area + "Ad : (0:NN)" + **pink loader flush on** the magenta→purple "<game> will launch after the ad" gradient bar. Auto-advances (6s demo; live ≈ 25s). |
| `playing` | game canvas + `PlayerControlBar` — help (circular, tooltip) · Remove Ads · "Game not loading? Refresh page!" · record · fullscreen. |

**Content below the player:** Popular Games (icon tiles) · **promoted-games band**
(`FeaturedBand` — unlabeled full-width white-10, portrait cards, **developer is the
emphasized line**) · Video Clips · Blogs · Top Picks · More Games · Categories ·
`Breadcrumb` (Home › Games › ‹genre› › ‹game›) · Footer.

## 3. Component inventory (all in `src/components/`)

- **shell:** `TopBar` (logo · AI search · profile avatar · Ana video widget), `SearchBar`
  (white, gradient AI border), `AppShell` (fixed glow + scroll column), `Footer`,
  `Breadcrumb`.
- **ui:** `Button` (Float matrix — 8 variants × 4 sizes × rounded/pill), `Icon` (renders
  any library SVG as a `currentColor` mask), `Section`/`SectionHeader` (24px heading +
  hairline), `RatingBadge`, `icons` (only the star + chevron glyphs the library lacks).
- **game / media / category / marketing / play** — see README structure.

## 4. Tokens & icons

- **Tokens:** `tailwind.config.ts` (Float foundation). Resolved values + Dark/Light modes
  in `design-source/figma/design-system/`. Rendered at `/style-guide`.
  - Accent `#ff42a5` (hover `#ff3392`, dark `#c20568`); Base ramp 900→50; Status
    (success/error/alert/warning/idle); spacing 2–40; radius 2–16; type 10→72.
- **Icons:** 419 real Float SVGs at 4 sizes in `public/icons/now-gg/`. Use
  `<Icon name="…" size={24} className="size-5 text-…" />` — the mask makes any icon take
  `currentColor`. Names come from each size's `_manifest.json`. Browse them at
  `/style-guide` → Icon library.

## 4b. Patterns

Recurring **compositions** (one level up from components) are catalogued in
`design-source/figma/design-system/PATTERNS.md` and rendered live at `/style-guide` →
**Patterns** — e.g. the hover-tile ring+zoom, media+label card, section affordances
(row "View All" vs grid "Show More"), icon-button+tooltip, chip/pill, dot-divider meta,
ad slot, glass surface, breadcrumb, page-ambient shell, AI search surface, the player
state-machine canvas, and the promoted band. Follow these recipes when building new
now.gg surfaces.

## 5. Where real systems plug in (integration points)

| Concern | Replica stub | Plug-in point |
|---|---|---|
| **Game catalog** | `lib/mock-data.ts`, `lib/play.ts`, `lib/featured.ts` | Replace mock arrays with API/CMS data; keep the `Game`/`Poster`/`PlayGame`/`Article`/`Video` types. |
| **Cloud streaming** | `GameStage` launch video + state machine | Mount the real game frame in the `playing` canvas; wire the launch→ad→playing transitions to the streaming SDK. |
| **Ads** | `AdSlot` (creative img or dashed placeholder) | Drop ad tags into the 336×280 / 728×90 slots; the loader/"will launch after the ad" bar maps to the pre-roll. |
| **Auth / profile** | static avatar + Ana video in `TopBar` | Wire avatar + login state. |
| **Search** | `SearchBar` is presentational | Wire query + results. |
| **Links** | tile/`href` → `/play/<id>`; nav `href="/"` placeholders | Point at real routes. |

## 6. Notes / open questions for the designer

- Section headers are a single size site-wide (24px). Live now.gg uses 32px on the play
  page — kept consistent per design direction.
- Play-page **Popular Games** uses square icon tiles here; the homepage uses portrait
  posters. Confirm if they should match.
- The promoted band's **developer-over-name** emphasis is taken verbatim from the live
  DOM — confirm it's intentional.
- Ad creatives + the launch video are samples; replace with production assets.

---

*Design system + decisions tracked in `visual-designer/` (taste.md, decisions.md).
Session history in `../logs/claude-code-sessions/`.*
