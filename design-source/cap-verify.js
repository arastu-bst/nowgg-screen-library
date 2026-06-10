const { chromium } = require('playwright');
const path = require('path');
const OUT = 'N:/Antigravity Main/nowgg/design-source/play/screens';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();

  // home — My Games row icon (accent)
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await sleep(2500);
  await p.screenshot({ path: path.join(OUT, 'verify-mygames.png'), clip: { x: 0, y: 56, width: 320, height: 76 } });

  // play -> playing -> control bar icons
  await p.goto('http://localhost:3000/play/little-alchemy-2', { waitUntil: 'networkidle', timeout: 90000 });
  await sleep(2000);
  await p.getByRole('button', { name: /play in browser/i }).first().click({ timeout: 5000 });
  await sleep(8000);
  // clip the bottom control bar (bottom of the canvas, above the leaderboard)
  await p.screenshot({ path: path.join(OUT, 'verify-controlbar.png'), clip: { x: 430, y: 690, width: 1000, height: 80 } });
  try { await p.getByRole('button', { name: /help & support/i }).first().screenshot({ path: path.join(OUT, 'verify-help-btn.png') }); } catch (e) { console.log('help shot:', e.message); }

  await ctx.close(); await b.close();
  console.log('CAPTURED verify');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
