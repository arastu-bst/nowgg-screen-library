// Verify hover states: My Games ring+tooltip, Popular poster ring+rating badge.
const { chromium } = require('playwright');
const SHOTS = 'N:/Antigravity Main/nowgg/__preview';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(4000);

  // My Games circular tile hover (ring + tooltip below)
  await p.locator('img[alt="World Guessr"]').first().hover();
  await sleep(500);
  await p.screenshot({ path: `${SHOTS}/hover-mygames.png`, clip: { x: 0, y: 60, width: 760, height: 240 } });

  // Popular poster card hover (ring + rating badge)
  const pop = p.locator('img[alt="ArmedForces.io"]').first();
  await pop.scrollIntoViewIfNeeded();
  await sleep(400);
  await pop.hover();
  await sleep(500);
  const box = await pop.boundingBox();
  await p.screenshot({ path: `${SHOTS}/hover-popular.png`, clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: 320, height: 360 } });

  await b.close();
  console.log('hover shots done');
})().catch((e) => { console.error(e.message); process.exit(1); });
