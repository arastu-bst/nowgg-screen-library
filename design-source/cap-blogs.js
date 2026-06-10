const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(4000);
  const h = p.getByRole('heading', { name: /^Blogs$/i }).first();
  await h.scrollIntoViewIfNeeded();
  await sleep(700);
  const box = await h.boundingBox();
  await p.screenshot({ path: 'N:/Antigravity Main/nowgg/__preview/blogs-toppicks.png', clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 16), width: 1280, height: 920 } });
  await b.close();
  console.log('done');
})().catch((e) => { console.error(e.message); process.exit(1); });
