// Compact token report from the extracted JSON files.
const fs = require('fs');
const path = require('path');
const OUT = 'N:/Antigravity Main/nowgg/design-source';

const files = ['tokens-home-desktop.json', 'tokens-game-desktop.json', 'tokens-home-mobile.json', 'tokens-game-mobile.json'];

function topN(map, n) {
  return Object.entries(map || {}).sort((a, b) => b[1] - a[1]).slice(0, n)
    .map(([k, v]) => `${k}  ×${v}`);
}
// merge frequency maps across files
function mergeKey(key) {
  const merged = {};
  for (const f of files) {
    const d = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
    for (const [k, v] of Object.entries(d[key] || {})) merged[k] = (merged[k] || 0) + v;
  }
  return merged;
}

console.log('################ MERGED ACROSS ALL 4 PAGES ################\n');
for (const key of ['colors', 'bgColors', 'borderColors', 'fontFamilies', 'fontSizes', 'fontWeights', 'lineHeights', 'letterSpacings', 'radii', 'shadows', 'gaps', 'paddings']) {
  console.log(`--- ${key} (top 18) ---`);
  console.log(topN(mergeKey(key), 18).join('\n'));
  console.log('');
}

// per-file specifics: rootVars, fonts, headings, buttons
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
  console.log(`\n################ ${f} ################`);
  console.log('title:', d.title);
  console.log('scrollHeight:', d.scrollHeight, ' images:', (d.images || []).length, ' svgs:', d.svgCount);
  const rv = Object.entries(d.rootVars || {});
  console.log(`rootVars: ${rv.length} total`);
  console.log(rv.slice(0, 40).map(([k, v]) => `  ${k}: ${v}`).join('\n'));
  console.log('fonts loaded:', JSON.stringify([...new Set(d.fonts || [])].slice(0, 20)));
  console.log('headings:');
  console.log((d.headings || []).slice(0, 12).map((h) => `  ${h.tag} ${h.size}/${h.weight}  "${h.text}"`).join('\n'));
  console.log('buttons (first 10):');
  console.log((d.buttons || []).slice(0, 10).map((b) => `  "${b.text}" bg=${b.bg} color=${b.color} r=${b.radius} pad=${b.padding} ${b.fontSize}/${b.fontWeight}`).join('\n'));
}
