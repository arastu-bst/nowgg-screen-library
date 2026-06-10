// Capture the three player states: launch (no bar) → ad → playing (control bar).
const { chromium } = require('playwright');
const path = require('path');
const URL = 'http://localhost:3000/play/little-alchemy-2';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play/screens';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2500);
  await p.screenshot({ path: path.join(OUT, 'state-launch.png') });

  // click Play in Browser -> ad
  try { await p.getByRole('button', { name: /play in browser/i }).first().click({ timeout: 4000 }); } catch (e) { console.log('play click:', e.message); }
  await sleep(1500);
  await p.screenshot({ path: path.join(OUT, 'state-ad.png') });

  // wait for the ad to finish -> playing
  await sleep(7000);
  await p.screenshot({ path: path.join(OUT, 'state-playing.png') });

  // hover the help icon to show its tooltip
  try { await p.getByRole('button', { name: /help & support/i }).first().hover({ timeout: 3000 }); await sleep(600); await p.screenshot({ path: path.join(OUT, 'state-help-tip.png') }); } catch (e) { console.log('hover help:', e.message); }

  await ctx.close(); await b.close();
  console.log('CAPTURED states');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
