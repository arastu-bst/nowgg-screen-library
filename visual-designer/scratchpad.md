# now.gg — Scratchpad
Inline correction-resolution log. One line per correction the moment it's
resolved. Promoted to decisions.md / taste.md at audit passes, then wiped.

Format: `YYYY-MM-DD HH:mm — <file> — <what changed> — Why: <one phrase>`

--- Pending audit entries ---

2026-06-16 — ui/Button.tsx — made polymorphic: renders <a> when given `href`, else <button> — Why: the external BlueStacks CTA needs a real crawlable anchor; reuse button visuals (Gate 2) instead of re-implementing them.
2026-06-16 — ui/BluestacksCta.tsx (NEW atom) — one "BlueStacks by now.gg" CTA → real <a href=bluestacks.com> target=_blank rel=noopener, 4 presets (topbar/hero/footer/band) — Why: now.gg→BlueStacks ad-serving experiment needs a crawlable cross-brand link, not a JS button or app-player download; single atom so the brand look can't drift across the 4 spots (Gate 3 satisfied — built as 1 reuse, not duplicated).
2026-06-16 — BluestacksCta — outline treatment everywhere, NEVER pink — Why: pink is reserved for Play CTAs (taste 2); a quiet white-on-dark CTA also keeps it recognizable cross-page.
2026-06-16 — BluestacksCta — BlueStacks mark rendered as <img> (developer-resource-bluestacks.svg), NOT the CSS-mask Icon — Why: mark is multi-color (white layers + now.gg-pink accent); a mask flattens to one color (codified 2026-06-11). White layers also need a dark/transparent bg → no white-fill variant.
2026-06-16 — TopBar / GameStage / Footer / page.tsx — wired the CTA into all 4 placements (topbar pill before ProfileMenu; play hero outline under Play; footer pill under logo = both pages; homepage mid-catalog band) — Why: stakeholder-requested spots ("app pages + certain sections").
2026-06-16 — marketing/BluestacksBand.tsx (NEW) — homepage promo = CONTAINED rounded white-10 band, not viewport-bleed — Why: homepage is one constrained max-w-content column; taste 16 (surface floating inside padding → rounded); a 100vw bleed would fight the scroll gutter. Container owns the section rhythm (taste 14, via AppShell space-y-10).
2026-06-16 — GATE 5 FLAG (audit) — new BluestacksCta + BluestacksBand have NO /style-guide entry yet — Why: new primitive + new marketing pattern need a Components showcase + Patterns entry + NAV row at the audit pass. (label-copy "BlueStacks by now.gg" is the reverse of the usual "now.gg by BlueStacks" lockup — confirmed by designer, but flag for brand-team sign-off before the real now.gg ships.)
