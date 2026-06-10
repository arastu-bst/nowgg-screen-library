const { chromium } = require('playwright');
const path = require('path');
const OUT = 'N:/Antigravity Main/nowgg/design-source/play/screens';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();

  // style guide (first hit compiles the route)
  await p.goto('http://localhost:3000/style-guide', { waitUntil: 'networkidle', timeout: 90000 });
  await sleep(3500);
  await p.screenshot({ path: path.join(OUT, 'sg-top.png') });
  await p.screenshot({ path: path.join(OUT, 'sg-full.png'), fullPage: true });
  // jump to icons
  await p.evaluate(() => { const el = document.getElementById('icons'); if (el) el.scrollIntoView(); });
  await sleep(1200);
  await p.screenshot({ path: path.join(OUT, 'sg-icons.png') });

  // homepage regression check
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await sleep(2500);
  await p.screenshot({ path: path.join(OUT, 'rc-home.png') });

  // play page regression check
  await p.goto('http://localhost:3000/play/little-alchemy-2', { waitUntil: 'networkidle', timeout: 90000 });
  await sleep(2500);
  await p.screenshot({ path: path.join(OUT, 'rc-play.png') });

  await ctx.close(); await b.close();
  console.log('CAPTURED final');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
