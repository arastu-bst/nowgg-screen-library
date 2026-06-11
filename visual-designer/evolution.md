# now.gg — Evolution
Last updated: 2026-06-10 (session 5 — Profile sidebar built; count 3; authoritative-source category fired again on a bespoke shape)

> VDA's growth + maturity timeline ON THE NOW.GG PROJECT. Separate from WSUP's
> evolution — a fresh notebook starts at Phase 1.

## Phase 2 — Confirmed-correction era (current, entered 2026-06-04)
All Phase 1 markers were hit by S3 but the transition wasn't recorded until the
S4 audit (staleness catch — this file sat untouched for 3 sessions of active work).

**Phase 1 markers — all met:**
- [x] Homepage + play page built and reviewed by the designer (S1–S3)
- [x] Correction cycles logged → taste.md refined from inference to confirmed
      (rules 9–14 are designer-confirmed; the S1 seed rules survived review)
- [x] Recurring correction category identified: **"verify the AUTHORITATIVE
      source (Figma node / live DOM) before finalizing — don't synthesize"** —
      fired in S1 (chrome invention), S2 (ad sizes, action bar), S3 (Float Forms,
      Widget Bar gradient), S4 (breadcrumb-in-footer anatomy).

**Active gaps:**
- Authoritative-source verification (the recurring category above). S4 nuance:
  the habit is improving — the breadcrumb fix was measured against the live DOM
  BEFORE editing, but only after the designer raised it. The gap closes when VDA
  verifies anatomy proactively at build time.
- Section-rhythm self-review (S4 catch #1) — now codified as taste rule 14;
  watch whether Gate 8 catches it unprompted next time.

**Maturity markers to reach Phase 3:**
- [ ] 3 consecutive sessions with designer_caught_count ≤ 3
- [ ] Zero authoritative-source misses across those sessions
- [ ] One surface designed first-pass with no anatomy corrections

**Count history:** S1 = 6 · S2 = 11 · S3 = ~14 · S4 = 3 · S5 = 3.
(S1–S3 counts climbed because scope climbed — ground-up build sessions with
dozens of surfaces. S4 is the first iteration-only session: 3 — rhythm,
breadcrumb anatomy, logo connectivity. S5 = 3 on a NEW-component build session
(Profile sidebar): panel-collapse (backdrop-filter containing-block trap, shipped
broken), closed-overlay leak, opaque-vs-glass consistency. Flat at 3 despite a
from-scratch build = good.)

## Session 5 (2026-06-10) — Profile sidebar
Built the Profile sidebar (glass drawer) from a live screenshot + Figma link, opened
from the TopBar avatar. Two clean Gate-8 misses (panel collapsed to 63px until
portaled; close/help leaked when closed) + one consistency correction (built opaque,
designer wanted the popup glass). **The authoritative-source recurring category fired
again** — the close/help "flap" was tuned BY EYE because the Desktop Bridge was offline,
and the designer rejected it (reverted to the simpler treatment). New this session:
I verified renders via a Playwright capture loop (caught the 63px collapse + the
silhouette) instead of trusting markup — a concrete step toward proactive verification.

**Phase 3 markers — status after S5:**
- [~] 3 consecutive sessions caught ≤ 3 → S4 = 3, S5 = 3 → **2 of 3** (one more clean session).
- [ ] Zero authoritative-source misses across those sessions → **NOT met** — S5's flap
      was a by-eye shape (bridge offline). Gap persists; now codified as a reasoning
      ("don't commit a guessed silhouette — get the source or keep the accepted treatment").
- [ ] One surface designed first-pass with no anatomy corrections → not this session.

---

## Phase 1 — Bootstrapping (2026-06-02 → 2026-06-03, sessions 1–3)
Session 1 (2026-06-02): notebook created, taste seeded from live-site extraction.
Taste rules were *inferred from the live site*, then validated/overridden by the
designer across S1–S3 (heavy correction as expected: 6 → 11 → ~14 catches, all
variants of building from inference instead of the authoritative source).
