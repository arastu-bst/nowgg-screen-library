// One-time: prepend the shared-core lens banner to vda-core craft files.
const fs = require('fs');
const dir = 'N:/Antigravity Main/agents/vda-core/';
const banner =
  '<!-- SHARED CORE (agents/vda-core/) — product-agnostic craft. The ACTIVE PROJECT is set by the session bootstrap (its CLAUDE.md). Read "WSUP" / WSUP paths as the active project; WSUP-named conventions & components are ILLUSTRATIONS of the principle. Per-project taste/decisions/insights/knowledge/logs live in <project>/visual-designer/ and never cross-contaminate. Full lens: agents/vda-core/agent.md header. -->\n\n';
for (const f of ['QUALITY-GATES.md', 'workflow.md', 'VDA-HEALTH-CHECK.md', 'reasonings.md']) {
  const p = dir + f;
  const c = fs.readFileSync(p, 'utf8');
  if (!c.startsWith('<!-- SHARED CORE')) { fs.writeFileSync(p, banner + c); console.log('banner +', f); }
  else console.log('already has banner:', f);
}
