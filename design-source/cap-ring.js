const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(3500);
  const h = p.getByRole('heading', { name: 'Top Games' }).first();
  await h.scrollIntoViewIfNeeded();
  await sleep(400);
  // nth(1) = the Top Games GRID tile (nth 0 is the My Games circle)
  await p.locator('img[alt="World Guessr"]').nth(1).hover();
  await sleep(500);
  const box = await h.boundingBox();
  await p.screenshot({ path: 'N:/Antigravity Main/nowgg/__preview/ring-compare.png', clip: { x: 0, y: Math.max(0, box.y - 12), width: 780, height: 440 } });
  await b.close();
  console.log('done');
})().catch((e) => { console.error(e.message); process.exit(1); });
