// Verify the hover ring now appears on Blog cards (and Short Video cards).
const { chromium } = require('playwright');
const SHOTS = 'N:/Antigravity Main/nowgg/__preview';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp0 = (n) => Math.max(0, n);
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(4000);

  const card = p.locator('a.group:has(h3)').first(); // a BlogCard
  await card.scrollIntoViewIfNeeded();
  await sleep(400);
  await card.hover();
  await sleep(500);
  const box = await card.boundingBox();
  await p.screenshot({ path: `${SHOTS}/hover-blog.png`, clip: { x: clamp0(box.x - 16), y: clamp0(box.y - 16), width: box.width + 32, height: box.height + 32 } });
  console.log('blog hover captured', JSON.stringify(box));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
