# now.gg — design handoff replica

A **design-only** rebuild of [now.gg](https://now.gg) (homepage + game player + a living
style guide), built for **developer handoff**. There is **no real backend, cloud
streaming, auth, ads, or payments** — the catalog is mock data and the player is a
visual state machine. The goal is pixel-fidelity to the live site + the Float design
system, and clarity for whoever wires up the real product.

Sibling project to `../WSUP/` (same philosophy). Maintained with the VDA design agent —
see `visual-designer/`.

---

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender/compile)
```

Stack: **Next.js 14.2.3** (App Router) · **React 18** · **Tailwind CSS 3.4** ·
**TypeScript 5**. Font: **Bricolage Grotesque** (loaded via `<link>` in `layout.tsx`).

## Routes

| Route | What it is |
|---|---|
| `/` | **Homepage** — My Games row, Top/Popular/More Games, Short Videos, Blogs, Top Picks, Categories, About, FAQ, footer. |
| `/play/[slug]` | **Game player** — opens for ANY game slug (defaults to Little Alchemy 2). A 3-state canvas: launch → ad → playing. |
| `/style-guide` | **Design-system reference** — colors, type, spacing/radius/elevation, the full icon library, and a live component showcase. |

## Project structure

```
src/
  app/                     # routes (page.tsx orchestrators, thin)
  components/
    shell/    TopBar · SearchBar · AppShell · Footer · Breadcrumb
    game/     GameIconTile · IconTileGrid · PosterCard · MyGamesRow
    media/    VideoClipCard · FeatureCard
    category/ CategoryChips
    marketing/AboutSection · FaqAccordion
    play/     PlayerAds · PlayerRail · GameStage · PlayerAdScreen ·
              PlayerControlBar · FeaturedBand · AdSlot
    ui/       Button · Icon · Section · SectionHeader · RatingBadge · icons
    style-guide/  ColorsSection · TypeScaleSection · ScalesSection ·
              IconLibrarySection · ComponentsSection · Swatch
  lib/        mock-data · play · featured · icon-library · cn
public/
  icons/now-gg/{16,24,32,40}/   # 419 real Float icon SVGs (+ _manifest.json)
  icons/categories/             # category glyphs (exported Figma SVGs)
  ad-leaderboard.png · ad-rectangle-decathlon.png · ad-rectangle-vr.png
  profile-avatar.png · ana-exp.webm · Launch_1920.mp4 · footer-logo.svg
design-source/
  figma/design-system/   # FULL Float extraction (see below)
  play/, screenshots/    # live-site captures + token JSON
  *.js, *.py             # extraction/capture scripts
tailwind.config.ts       # design tokens (Float foundation)
```

## Design system

Foundation = the **Float** design system, extracted live from Figma
(`apmb9PRrJYKc7cNhCUgz7L`) via the figma-console Desktop Bridge. The authoritative
extraction lives in **`design-source/figma/design-system/`**:

- `DESIGN-SYSTEM.md` — human-readable reference (tokens resolved per mode, type scale,
  effects, component list)
- `tokens.resolved.json` · `variables.raw.json` · `styles.json` · `components.json`

Those tokens are folded into **`tailwind.config.ts`** (Base ramp, status, brand/logo
palettes, gradients, white/black alpha ramps, Float radius/spacing/type/shadows). Browse
it all rendered at **`/style-guide`**.

**Breakpoints:** mobile **390**, desktop **1440**. **Type:** Bricolage Grotesque.

## What's mock / stubbed (by design)

- **Catalog** — `lib/mock-data.ts` (real now.gg CDN art + titles, mock ratings).
- **Game player** — `GameStage` is a client state machine (launch video + ad + control
  bar). No real stream; the launch video is `public/Launch_1920.mp4`.
- **Ads** — `AdSlot` renders supplied creatives or dashed IAB-sized placeholders.
- **No** auth, accounts, search backend, or analytics.

See **`HANDOFF.md`** for the screen-by-screen breakdown and where real systems plug in.
