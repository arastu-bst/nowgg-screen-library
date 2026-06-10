// Extract footer text content (headers, links, bottom bar) from the saved dump.
const fs = require('fs');
const P = 'C:/Users/hello/.claude/projects/N--Antigravity-Main/9e313a4b-e526-42a4-bd7f-6e4b4c06262b/tool-results/mcp-figma-console-figma_get_component_for_development-1780425275270.txt';
const data = JSON.parse(fs.readFileSync(P, 'utf8'));
const out = [];
function walk(n, path) {
  if (!n) return;
  if (n.type === 'TEXT' && n.characters) {
    const st = n.style || {};
    out.push(`${st.fontSize || '?'}/${st.fontWeight || '?'}  "${n.characters.replace(/\n/g, ' ')}"`);
  }
  // note column/group frame names
  if ((n.type === 'FRAME' || n.type === 'INSTANCE') && /col|column|social|link|menu|bottom|legal|lang/i.test(n.name || '')) {
    out.push(`  [${n.type} · ${n.name}]`);
  }
  (n.children || []).forEach((c) => walk(c, path));
}
walk(data.component, '');
console.log(out.join('\n'));
