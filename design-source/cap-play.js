const { chromium } = require('playwright');
const path = require('path');
const SHOTS = 'N:/Antigravity Main/nowgg/__preview';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  let ok = false;
  for (let i = 0; i < 40; i++) {
    try { await p.goto('http://localhost:3000/play/little-alchemy-2', { waitUntil: 'domcontentloaded', timeout: 5000 }); ok = true; break; }
    catch (e) { await sleep(2000); }
  }
  if (!ok) { console.log('dev not ready'); process.exit(1); }
  await sleep(4000);
  await p.screenshot({ path: path.join(SHOTS, 'play-desktop-top.png') });
  await p.evaluate(() => {
    let best = null, bd = 0;
    for (const el of document.querySelectorAll('*')) { const oy = getComputedStyle(el).overflowY; if ((oy === 'auto' || oy === 'scroll') && el.clientHeight > 200) { const d = el.scrollHeight - el.clientHeight; if (d > bd) { bd = d; best = el; } } }
    if (best) { let n = best; while (n && n !== document.documentElement) { n.style.overflow = 'visible'; n.style.height = 'auto'; n.style.maxHeight = 'none'; n = n.parentElement; } document.body.style.height = 'auto'; document.body.style.overflow = 'visible'; document.documentElement.style.height = 'auto'; }
    window.scrollTo(0, 0);
  });
  await sleep(1500);
  await p.screenshot({ path: path.join(SHOTS, 'play-desktop-full.png'), fullPage: true });
  await b.close();
  console.log('done');
})().catch((e) => { console.error(e.message); process.exit(1); });
