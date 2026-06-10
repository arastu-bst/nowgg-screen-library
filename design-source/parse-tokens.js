// Extract named color swatches + button/text specs from the saved Float token-frame dump.
const fs = require('fs');
const P = 'C:/Users/hello/.claude/projects/N--Antigravity-Main/9e313a4b-e526-42a4-bd7f-6e4b4c06262b/tool-results/mcp-figma-console-figma_get_component_for_development-1780419216143.txt';
const data = JSON.parse(fs.readFileSync(P, 'utf8'));
const hx = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
const hex = (c) => '#' + hx(c.r) + hx(c.g) + hx(c.b) + (c.a != null && c.a < 1 ? hx(c.a) : '');

const swatches = [];
const texts = [];
const buttons = [];
function walk(n, depth) {
  if (!n || depth > 10) return;
  let fill = '';
  if (Array.isArray(n.fills)) {
    const s = n.fills.find((f) => f.type === 'SOLID' && f.visible !== false);
    if (s && s.color) fill = hex(s.color) + (s.opacity != null && s.opacity < 1 ? ` @${s.opacity}` : '');
    if (!fill && n.fills.find((f) => f.type && f.type.startsWith('GRADIENT'))) fill = 'gradient';
  }
  const nm = n.name || '';
  // named color swatch: has a fill and a token-ish name
  if (fill && fill !== 'gradient' && /[/]|color|primary|secondary|neutral|surface|bg|text|accent|brand|gray|grey|success|error|warning|info|stroke|border|fill|\d{2,3}/i.test(nm)) {
    swatches.push(`${nm} = ${fill}`);
  }
  if (n.type === 'TEXT' && n.characters) {
    const st = n.style || {};
    texts.push(`"${n.characters.slice(0, 50).replace(/\n/g, ' ')}" ${st.fontFamily || ''} ${st.fontSize || ''}/${st.fontWeight || ''}${fill ? ' ' + fill : ''}`);
  }
  if (/button|btn/i.test(nm) && (n.type === 'INSTANCE' || n.type === 'COMPONENT' || n.type === 'FRAME')) {
    const cp = n.componentProperties ? Object.entries(n.componentProperties).map(([k, v]) => `${k}=${v.value}`).join(',') : '';
    buttons.push(`[${n.type}] ${nm} r${n.cornerRadius != null ? n.cornerRadius : '?'} fill=${fill || '-'} {${cp}}`);
  }
  (n.children || []).forEach((c) => walk(c, depth + 1));
}
walk(data.component, 0);

const uniq = (a) => [...new Set(a)];
console.log('======== COLOR SWATCHES (named, ' + uniq(swatches).length + ') ========');
console.log(uniq(swatches).join('\n'));
console.log('\n======== BUTTONS (' + uniq(buttons).length + ') ========');
console.log(uniq(buttons).join('\n'));
console.log('\n======== TEXT LABELS (first 80 of ' + uniq(texts).length + ') ========');
console.log(uniq(texts).slice(0, 80).join('\n'));
