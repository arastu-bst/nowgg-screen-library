// Find each category chip's icon node ID (to export the real SVGs).
const fs = require('fs');
const P = 'C:/Users/hello/.claude/projects/N--Antigravity-Main/9e313a4b-e526-42a4-bd7f-6e4b4c06262b/tool-results/mcp-figma-console-figma_get_component_for_development-1780424056096.txt';
const data = JSON.parse(fs.readFileSync(P, 'utf8'));
const LABELS = new Set(['Browser Games', 'Casual Games', 'Strategy Games', 'Simulation Games', 'Role Playing Games', 'Action Games', 'Adventure Games', 'Puzzle Games', 'Arcade Games', 'Sports Games', 'Casino Games', 'Racing Games', 'Card Games', 'Educational Games', 'Social Games']);

const results = [];
function walk(n) {
  if (!n) return;
  const kids = n.children || [];
  const txt = kids.find((c) => c.type === 'TEXT' && c.characters && LABELS.has(c.characters.trim()));
  if (txt) {
    // this node is a chip; icon = the non-text child (instance / frame / vector / group)
    const icon = kids.find((c) => c.type !== 'TEXT');
    results.push({ label: txt.characters.trim(), iconId: icon ? icon.id : null, iconType: icon ? icon.type : null, iconName: icon ? (icon.name || '') : '' });
  }
  kids.forEach(walk);
}
walk(data.component);
console.log(JSON.stringify(results, null, 2));
console.log('count:', results.length);
