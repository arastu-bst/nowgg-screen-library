# now.gg — Patterns Kit

Recurring **compositions** in the now.gg replica — the recipes that repeat across
screens, one level up from individual components (tokens = values, components = parts,
**patterns = how parts are assembled**). Rendered live at `/style-guide` → Patterns.
All values reference the Float tokens in `tailwind.config.ts`.

---

### 1. Hover tile — ring + zoom
The universal content-tile interaction.
- **Recipe:** a `group` wrapper · ring span `pointer-events-none absolute -inset-px rounded-[R+1] bg-accent-hot opacity-0 transition-opacity group-hover:opacity-100` BEHIND · clip `relative overflow-hidden rounded-[R] border border-line` · image `transition-transform group-hover:scale-105`.
- **Why R+1:** the ring sits 1px outside a clip of radius R, so its corner stays concentric (e.g. card r12 → ring r13; tile r8 → r9; rail r4 → r5).
- **Used in:** GameIconTile, PosterCard, MyGamesRow, VideoClipCard, FeatureCard, FeaturedBand, PlayerRail.

### 2. Media + label card
Portrait/landscape media with text below.
- **Recipe:** hover-tile clip (above) · then `<p class="line-clamp-2 text-sm text-text-secondary">` title/caption. PosterCard adds a hover-revealed RatingBadge top-left.
- **Used in:** PosterCard (3:4), VideoClipCard (2:3), FeatureCard (16:9), FeaturedBand (4:5).

### 3. Section + affordance
Every catalog block.
- **Recipe:** `SectionHeader` = `text-xl font-semibold text-text-primary/90` + `border-b border-line pb-2`. Affordance splits by content type: **ROW** → "View All" header link (`text-2xs font-semibold text-text-tertiary` + 16px chevron); **GRID** → "Show More" `Button variant="ghost"` BELOW the grid.
- **Used in:** all home + play sections (`Section`).

### 4. Icon button + tooltip
Chrome icon controls.
- **Recipe:** button `flex size-9 items-center justify-center rounded-tile text-white-90 transition-colors hover:bg-white-10` · tooltip `pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-surface-raised px-2.5 py-1 text-2xs text-white opacity-0 group-hover:opacity-100` (Float "Alt Text"). Help variant is circular + bordered (`rounded-full border border-white-40`).
- **Used in:** PlayerControlBar (help · record · fullscreen).

### 5. Chip / pill
- **Recipe:** chip `rounded-l border border-line bg-fill-subtle px-4 py-2.5` + `hover:border-line-strong hover:bg-fill-soft hover:text-text-primary`. Pills use `rounded-pill` (search bar, Button shape="pill", Remove-Ads gold pill). Category chips carry a per-category accent SVG.
- **Used in:** CategoryChips, SearchBar, Button.

### 6. Dot-divider meta row
- **Recipe:** `inline-flex items-center gap-3 text-sm` · ★ `StarIcon text-gold` + value · `<span class="size-1 rounded-full bg-white-40">` dot separators · dev · genre.
- **Used in:** GameStage launch meta.

### 7. Ad slot
- **Recipe:** `AdSlot` — **square corners** (no radius), sized to the IAB unit. With a creative: `overflow-hidden` + `<img object-cover>`. Placeholder: `border border-dashed border-line bg-fill-subtle` + centered size label.
- **Used in:** PlayerAds (336×280 ×2), play leaderboard (728×90).

### 8. Rating badge
- **Recipe:** dark glass pill · gold ★ · 2-decimal rating · hover-revealed (parent applies `opacity-0 group-hover:opacity-100`) top-left on posters.
- **Used in:** PosterCard; also the style-guide.

### 9. Glass surface
- **Recipe:** header `bg-black-70 backdrop-blur-2xl border-b border-line`; stage cards/panels use `bg-fill-subtle`/`bg-fill-soft` + `border border-line` hairlines over the dark page. Player bar uses `bg-player-bar` (magenta→black gradient).
- **Used in:** TopBar, PlayerControlBar, cards, AdSlot placeholders.

### 10. Breadcrumb
- **Recipe:** `<ol class="flex flex-wrap items-center gap-2 text-sm">` · trail links `font-semibold text-text-primary/90` · `ChevronRight text-text-dim` separators · current (last) `text-text-tertiary`, not a link.
- **Used in:** play page (above footer).

### 11. Page ambient shell
- **Recipe:** fixed `bg-glow-page` layer (`pointer-events-none fixed inset-0 z-0`) — pink glow bottom-left + teal bottom-right — under a sticky dark-glass TopBar, a single `overflow-y-auto` content column, and a **transparent** Footer so the ambient shows through.
- **Used in:** AppShell (home), play page shell.

### 12. AI search surface
- **Recipe:** white surface + `bg-gradient-ai` (teal→purple) border via a padded gradient wrapper + gradient search glyph + "Powered by AI" microcopy. A light affordance against the dark chrome — a now.gg signature.
- **Used in:** SearchBar (TopBar).

### 13. Player state-machine canvas
- **Recipe:** one canvas, three states driven by client state (launch → ad → playing). Launch = launch video + 70% `bg-black-70` scrim + centered launch block. Ad = `bg-ad-loader` over `bg-ad-launch-bar`. Playing = game + `bg-player-bar` control bar. Bottom bar is absent in launch.
- **Used in:** GameStage.

### 14. Promoted band
- **Recipe:** unlabeled FULL-WIDTH `bg-white-10` band breaking out of the content container; grid of 4:5 poster cards where the **developer is the emphasized line** (game name `text-2xs text-text-primary/70` above, dev `text-sm font-medium text-text-primary` below).
- **Used in:** FeaturedBand (between Popular Games and Video Clips).
