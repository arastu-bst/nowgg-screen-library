// Scroll the inner main container of the play page and capture the sections below the player.
const { chromium } = require('playwright');
const path = require('path');
const URL = 'http://localhost:3000/play/little-alchemy-2';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play/screens';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);
  // scroll the inner scroll container (main) down to the sections
  await p.evaluate(() => { const m = document.querySelector('main'); if (m) m.scrollTo(0, m.scrollHeight * 0.0 + (window.innerHeight - 64)); });
  await sleep(1500);
  await p.screenshot({ path: path.join(OUT, 'local-sections-1.png') });
  await p.evaluate(() => { const m = document.querySelector('main'); if (m) m.scrollBy(0, 1500); });
  await sleep(1500);
  await p.screenshot({ path: path.join(OUT, 'local-sections-2.png') });
  await p.evaluate(() => { const m = document.querySelector('main'); if (m) m.scrollTo(0, m.scrollHeight); });
  await sleep(1500);
  await p.screenshot({ path: path.join(OUT, 'local-sections-3.png') });
  await ctx.close(); await b.close();
  console.log('CAPTURED sections');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
