# now.gg — Taste
Last updated: 2026-06-10 (session 5 — rule 13 corrected (white-20, not black-30) + extended to cover nav drawers; Profile sidebar built)

> This file is now.gg's design *language* and the designer's corrections — NOT
> token specs (those live in `tailwind.config.ts` + `/style-guide`). It captures
> how now.gg *feels* so VDA can design new now.gg surfaces from instinct.
> **This is now.gg's house style and is unrelated to WSUP's.**

## The core feeling
now.gg is a **cloud-gaming portal** — a dense, browser-based storefront for
playing Android games instantly. The design job is to make a large catalog feel
**energetic and browsable**, not minimal. Different DNA from WSUP: WSUP is slim &
mobile-first companion; now.gg is grid-dense, marketing-forward, desktop-first.

## Codified taste rules (seed — refine as the designer corrects)

1. **Game art is the hero; chrome recedes.** The UI is a dark, low-saturation
   stage (`#0d0c14` bg, near-transparent white-5%/10% surfaces) so full-color
   game thumbnails and character art pop. Never compete with the art — keep
   panels, borders, and text chrome quiet.

2. **Pink is a spotlight, not a wash.** `#ff42a5` appears only on the things you
   want clicked — primary "Play" CTAs, active state, focus ring, and one brand
   glow in the bottom-left corner. Everywhere else is white-on-dark. Overusing
   pink kills its pull.

3. **App-shell, not a scrolling document.** A fixed dark-glass top bar (logo · AI
   search left · profile + Ana widget right) sits above a single scrolling main
   column. **No left nav rail** — an early inferred rail was wrong (confirmed
   against Figma + live). The fixed bar frames the catalog like a console dashboard.

4. **Everything is a row or a grid.** Content is sections of either an icon-tile
   grid (square game icons + label) or a horizontal card carousel (landscape art).
   Each section = a heading + a "View All"/"Show More" affordance. Rhythm comes
   from repeating this unit, not from bespoke layouts.

5. **Dense but breathable.** Desktop packs 9 icon tiles / 5 cards per row (mobile
   3 / 2) — dense. The breathing room is the consistent 4px-based gaps (8/12/16/24)
   and generous section spacing, not whitespace inside the grid.

6. **Rounded, soft, friendly.** 8px on tiles, 12px on big CTAs/cards, pill on the
   search bar + category chips, circles for avatars/category icons. Soft shadows
   (`0 4px 16px rgba(0,0,0,.08)`), never hard edges. A subtle pink inset glow can
   signal a hovered/active tile.

7. **Type is quiet and functional.** Bricolage Grotesque, mostly 400 body / 600
   headings. Section headings are modest (20px home, 32px game desktop) — they
   organize, they don't shout. Tiny 10–12px labels do a lot of the work; keep them
   legible (don't drop below 10px).

8. **Marketing surfaces are first-class.** Unlike a pure app, now.gg pages carry
   blogs, short-video cards, SEO copy blocks ("What is now.gg"), and ad slots.
   These are part of the design, not afterthoughts — give them the same card
   discipline as game content.

## The game page hero
The one bespoke moment: a game page opens on large character-art bg with a dark
scrim (top→bottom + left→right gradients) so the title, ★rating, dev + genre
chips, and the pink **Play in browser** CTA stay legible over busy art. This is
the page's emotional peak — let the art breathe before the catalog rows begin.

## The game player (refined — session 2)
The play page is the **cloud-game player**, a 3-state canvas, NOT a marketing page:
- **Launch (default):** the now.gg launch video plays behind a **70% black scrim**; the
  game icon sits in the video's controller-cloud frame with title · ★rating · dev ·
  genre · category pill · pink **Play in Browser** CTA · SEO blurb. **No bottom bar —
  the canvas runs full height.** This is the screen a user first sees.
- **Ad:** a pre-roll ad fills the canvas; a **pink loader sits flush ON TOP of** the
  magenta→purple "<game> will launch after the ad" gradient bar.
- **Playing:** the control bar appears on a dark magenta→black gradient — help
  (circular, bordered, hover tooltip) · Remove Ads (gold pill + coin) · "Game not
  loading? Refresh page!" · record · fullscreen.
The player is framed by **2× 336×280 Large Rectangle** ads + a 70px recent-games rail
on the left and a **728×90 leaderboard** under the canvas. **Ad units are
square-cornered and rendered at their exact IAB size, centered — never stretched.**

## Codified taste rules (session 2 additions)
9. **Icons are the real now.gg/Float library.** Render library SVGs via the CSS-mask
   `Icon` component so they take `currentColor`. Only hand-draw when the library has no
   equivalent (rating star, nav chevron) or for third-party brand marks (YouTube,
   Discord). Never hand-draw a glyph the library already has.
10. **Ad units don't round.** Game/content tiles keep the 8/12px radius; ad slots are
    square-cornered (they're real ad creatives).
11. **Section headers are one size site-wide** (24px/600/white-90 + hairline) — home and
    play match; don't special-case per page.
12. **Promoted/featured bands are full-bleed.** now.gg punctuates the catalog with an
    unlabeled white-10 full-width band of portrait poster cards where the **developer is
    the emphasized line** (game name 12/white-70 above, dev 14/white below).
13. **Overlay scrims are ALWAYS black-70; overlay panels are white-20 frosted glass.**
    Every modal/popup/**drawer** scrim = `black-70` — no exceptions. The PANEL is a
    `white-20` frosted glass (backdrop-blur). This applies to centered popups AND to
    full-height **nav drawers** — the Profile sidebar follows the same glass, NOT an
    opaque exception (an opaque-drawer attempt was overridden by the designer in S5).
    Inner chips on the glass use `black-20` (`white-05` vanishes against `white-20`).
    Text inputs use the Float `Forms` states (default border white-50 → hover white-70
    → focus accent; placeholder white-30; label white-80). *(S5: corrected from "black-30".)*

14. **The container owns rhythm and placement — never the child.** Page/section
    wrappers own section spacing: a full-bleed band gets the SAME section rhythm
    above and below from the wrappers around it, never from its own internal
    padding. Shell containers own their children's placement: the footer owns its
    breadcrumb row; the trail component renders only the trail. Whenever a child
    component carries page-level margins/padding, that's drift — move the spacing
    up to the container. (Both S4 catches were this one principle.)

## Open corrections log
*(Sessions 2 + 4 corrections promoted above. S5 corrections promoted to rule 13 +
decisions.md + reasonings.md. The designer's future corrections accumulate here.)*
