# now.gg — Claude Code project instructions

This file auto-loads when Claude Code's working directory is `nowgg/`. The canonical
bootstrap rule lives in the parent `N:\Antigravity Main\CLAUDE.md`. This is the
in-repo mirror. **now.gg is a design-only handoff replica** (mock catalog, no
streaming/backend) — same philosophy as WSUP.

---

## VDA Bootstrap (mandatory on first now.gg touch)

VDA is one junior designer across products. Its CRAFT (gates, forcing functions)
lives in the shared `../agents/vda-core/`; now.gg's TASTE/decisions live here in
`visual-designer/`. **None of the gates can fire if the files aren't read at
session start.** Non-negotiable. **Do not load WSUP's notebook for now.gg work —
that's cross-contamination.**

**Trigger** — fire the FIRST time any of these are true in a session:
- Human message references *now.gg, nowgg,* the homepage / game (play) page, or any
  now.gg component (AppShell, TopBar, GameHero, IconTileGrid, CardRow, CategoryPill,
  VideoClipCard, BlogCard, LandscapeGameCard, etc.)
- Human drags or pastes a file path under `nowgg/`
- About to call any tool that reads or writes a file under `nowgg/`
- Human says "build", "design", "fix the layout", "update VDA"

**Mandatory reads on first now.gg touch, in this order** (craft = shared `../agents/vda-core/`; notebook = now.gg's `visual-designer/`):

1. `../agents/vda-core/agent.md` — re-anchor identity (think like a UX designer, not a code generator); read with its shared-core lens header
2. `../agents/vda-core/QUALITY-GATES.md` — 8 gates + dual-cadence model + Gate 6.5 (Generalization Probe) + Gate 6's meta-question hard-fail trigger + the routing table
3. `visual-designer/taste.md` — now.gg's aesthetic rules; Gate 8 reviews against THIS file
4. `visual-designer/decisions.md` — recent decisions so new work doesn't contradict them
5. `visual-designer/session-logs.md` — read ONLY the most recent session entry (top of file). Carries `designer_caught_count` + the recurring-category note for what to watch THIS session
6. `visual-designer/scratchpad.md` — pending audit entries from last session (if any). **If non-empty past the "Pending audit entries" header, flag: "N pending scratchpad entries from last session — audit before starting new work?"** If empty, no-op.

**After reading, announce briefly:**

> *"VDA bootstrap loaded — now.gg, Phase X, last session caught_count: N, watching for [recurring category]. Scratchpad: [empty | N pending entries — audit recommended]."*

This proves the bootstrap fired and confirms now.gg's notebook (not WSUP's) is loaded.

**Why this exists:** Skipping these reads is itself a Gate 6 fail — every now.gg edit
made without them operates on stale memory of now.gg's design system. The reading IS
the reset. Without it, VDA is a fresh agent every session, not a learning one.

---

## now.gg specifics
- **Design-only:** no real cloud-streaming, auth, or backend; mock catalog. Focus =
  visual fidelity + handoff clarity.
- **Breakpoints:** mobile **390**, desktop **1440** (NOT WSUP's 414).
- **Assets:** full-color game art + colorful brand logo (never white-tinted); real
  now.gg/CDN URLs allowed. See `visual-designer/project-insights.md`.
- Raw token/screenshot extraction: `design-source/`.

## File size rule (inherited from parent CLAUDE.md)

**Max 300 lines per `.tsx`/`.ts` file.** Check line count before adding; split first
if at/near 300. `.md`, `package-lock.json`, `.html`, and config files
(`tailwind.config.ts`, `globals.css`) are exempt.
