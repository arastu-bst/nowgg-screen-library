# now.gg — Evolution
Last updated: 2026-06-25 (S8 — homepage/play overhaul + S7+S8 audit; count ROSE to 6; new recurring category: *copy the working sibling's structure first* = the WSUP S33–S36 precedent-grep gap, now on now.gg)

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

**Count history:** S1 = 6 · S2 = 11 · S3 = ~14 · S4 = 3 · S5 = 3 · S6 = 5 · S7 = 1 · **S8 = 6**.
(S7 was a clean small CTA build — count 1. **S8 ROSE to 6** on a large overhaul — see the S8
entry: the recurring category shifted from authoritative-source to *precedent-grep / copy the
working sibling first* — the same gap that rolled WSUP S33–S36. The clock to Phase 3 stays reset.)
(S1–S3 counts climbed because scope climbed — ground-up build sessions with
dozens of surfaces. S4 is the first iteration-only session: 3 — rhythm,
breadcrumb anatomy, logo connectivity. S5 = 3 on a NEW-component build session
(Profile sidebar): panel-collapse (backdrop-filter containing-block trap, shipped
broken), closed-overlay leak, opaque-vs-glass consistency. Flat at 3 despite a
from-scratch build = good. **S6 = 5 — the streak ROSE.** A Figma-accuracy pass on
the S5 sidebar surfaced 4 S5 inference/taste-9 debts (stat cards not Figma + their
icons 404'd invisible; subscription = hand-drawn diamond; edit pencil = wrong/grey
glyph) + 1 genuine S6 mid-session miss (notch glyphs shipped 80%-grey when the
designer wanted white). Honest read: 4 of 5 trace to S5 building from inference
while the Desktop Bridge was OFFLINE — corrected now that it's online — but
hand-drawing a diamond when the library has the badge was a taste-9 miss
regardless of bridge access.)

## Session 8 (2026-06-25) — now.gg homepage/play overhaul + the full S7+S8 audit
Large iteration + new-build session: BlueStacks CTA → live header lockup then narrowed to
header-only (BluestacksBand deleted); "Football Fever" `CollectionPanel` + sticky right-rail;
Show-More + short-videos sections removed; nowPrime popup replicated 1:1 + a `/play` flow
toggler + the subscribe→PRIME-logo flow (`NowPrimeProvider`); shared `CloseButton`; rounded
side-key bug fixed (`l`→`r10`, `s`→`r6`); `Button` reverted to button-only.

**designer_caught_count: 6** (S5 = 3 · S6 = 5 · **S8 = 6** — the streak ROSE). Qualifying
(VDA shipped, designer caught): (1) Football Fever list uncapped — didn't match now.gg's
internal-scroll; (2) **nowPrime bottom blur invisible — fought across several rounds before
matching HelpSupport's structure** (the central miss); (3) Best Value badge black/mixed-case —
scraped the container, not the leaf; (4) badge height + crowded title not now.gg-accurate;
(5) close icons inconsistent across popups (Gate 7); (6) wordmark upscaled/pixelated. Excluded
as designer-driven taste-calibration: close-size, header-wordmark size, PRIME shift nudges,
Monthly-blue (I surfaced it, not silently chosen).

**Recurring category (honest):** *copy the working sibling's STRUCTURE first.* The blur fiasco is
the SAME precedent-grep gap that rolled WSUP S33–S36 — HelpSupportModal already solved the frosted
popup and I re-derived instead of copying it. Remediation applied this audit: frosted-popup
pattern → KB; "copy the working sibling first" + "read the leaf not the container" → reasonings.
The fix is habit, not more rules — next clean test is matching the precedent first-pass.

**Phase:** still **Phase 2**. Phase-3 markers (3 consecutive sessions caught ≤ 3, zero
precedent-grep misses, one first-pass-clean surface) — clock resets again.

**Audit (this turn):** code gate — tsc 0, `next build` green (5/5 routes), Button orphan removed,
0 dead refs. Scratchpad (30 rows, S7+S8) promoted → decisions/taste/KB/reasonings/insights, wiped.
**Gate 5 — DONE (same-day follow-up):** tokenized `border-hair` + `shadow-pill` +
`shadow-plan-card`, extracted the shared `HEADER_PILL` chrome (Gate-3 at 2), and synced every
new colour/gradient/shadow/border/component/pattern into `/style-guide`. Exact-1:1-replication
values kept as documented one-offs (the principled Gate-1 exception, like the IAB ad sizes).

**S8 follow-up #2 (same day) — the tokenization INTRODUCED a regression, caught + fixed.** The
`border-[0.8px]`→`border-hair` migration silently dropped the stroke on every `cn()`-built component
(tailwind-merge mis-buckets the custom width key as a colour). Designer caught it ("strokes gone now, why?").
Fixed by making `cn()` design-system-aware (`extendTailwindMerge` mirrors all custom keys); verified live
(0 drops / 1144 els) + build green. This is a **verify-the-real-rendered-result** miss — I trusted the
`/style-guide` swatch, which used a plain string and hid the drop — the SAME recurring family as now.gg
S5/S6 + blueAI S2/S5. Honest count: S8's designer-caught effectively **6 → 7** incl. this follow-up. Clock
to Phase 3 stays reset; next clean test is a token migration verified on the real consumer first-pass.

## Session 7 (2026-06-16) — BlueStacks "by now.gg" cross-brand CTA (4 placements), shipped
**designer_caught_count: 1** — "full width" misread (built a `fullBleed` band; designer meant the
homepage band on the app page too). NOT the watched authoritative-source/taste-9 category; applied
the multi-color-`<img>` + pink-reservation rules correctly. **Audit was DEFERRED** (designer said
bye) → 8 scratchpad rows carried into S8 (now promoted). A clean small build between the heavier S6/S8.

## Session 6 (2026-06-11) — Profile sidebar Figma-accuracy + polish, then shipped
Iteration/polish pass on the S5 Profile sidebar, with the **Desktop Bridge online** this
time. The designer walked the sidebar to Figma-accuracy: notch glyphs → pure white (I'd
shipped 80% — a real mid-session Gate-8 miss); header avatar removed (duplicate of the
profile-row avatar) + a pinned-header hairline added; drawer top-left corner squared;
stat cards rebuilt to the Figma "Stats Row" node with **exported badge illustrations**
(game-cards / gold-cauldron); edit pencil + subscription badge swapped to the exact Figma
glyphs. Then committed + deployed to Vercel (`nowgg-screen-library.vercel.app`, same team
as wsup/blueai). Audit pass extracted `CloseGlyph` (Gate 3 at 4 consumers).

**The recurring authoritative-source/taste-9 category fired again** — but with an honest
nuance: S5 built the sidebar's icons/stats from inference because the bridge was OFFLINE;
S6 corrected them once it was online. The genuine lesson (now codified in reasonings):
*when the source is inaccessible, flag inferred chrome provisional-pending-source so it's
revisited — don't let a guess read as final*; AND *a glyph the library already has should
use the library even offline* (the hand-drawn subscription diamond was taste-9 regardless).

**Phase 3 markers — status after S6:**
- [ ] 3 consecutive sessions caught ≤ 3 → S4 = 3, S5 = 3, **S6 = 5 → streak RESET** (need 3 fresh).
- [ ] Zero authoritative-source misses → **NOT met** (taste-9 hand-drawn glyph + inference debt).
- [ ] One surface first-pass, no anatomy corrections → not this session (polish/correction pass).
- Net: still Phase 2. The clock to Phase 3 restarts; next clean iteration session is the test.

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
