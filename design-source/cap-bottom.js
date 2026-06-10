const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SHOTS = 'N:/Antigravity Main/nowgg/__preview';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(4000);
  await p.getByRole('heading', { name: /What is now\.gg/i }).first().scrollIntoViewIfNeeded();
  await sleep(600);
  await p.screenshot({ path: `${SHOTS}/about-faq.png` });
  await p.locator('footer').scrollIntoViewIfNeeded();
  await sleep(600);
  await p.screenshot({ path: `${SHOTS}/footer-built.png` });
  await b.close();
  console.log('done');
})().catch((e) => { console.error(e.message); process.exit(1); });
