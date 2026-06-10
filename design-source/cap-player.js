// Capture the rebuilt local play page (the game player) for self-critique.
const { chromium } = require('playwright');
const path = require('path');
const URL = 'http://localhost:3000/play/little-alchemy-2';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play/screens';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch({ headless: true });
  // desktop
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2500);
  await p.screenshot({ path: path.join(OUT, 'local-player-top.png') });
  await p.screenshot({ path: path.join(OUT, 'local-player-full.png'), fullPage: true });
  await ctx.close();
  // mobile
  const m = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const mp = await m.newPage();
  await mp.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);
  await mp.screenshot({ path: path.join(OUT, 'local-player-mobile.png') });
  await m.close();
  await b.close();
  console.log('CAPTURED');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
