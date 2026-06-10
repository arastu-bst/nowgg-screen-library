// Self-critique capture: screenshot the running dev server at desktop + mobile.
// Expands the inner scroll container so fullPage captures the whole homepage.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const SHOTS = 'N:/Antigravity Main/nowgg/__preview';
fs.mkdirSync(SHOTS, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const VPS = [{ n: 'desktop', w: 1440, h: 900 }, { n: 'mobile', w: 390, h: 844 }];

(async () => {
  const b = await chromium.launch({ headless: true });
  for (const vp of VPS) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    let ok = false;
    for (let i = 0; i < 40; i++) {
      try { await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 5000 }); ok = true; break; }
      catch (e) { await sleep(2000); }
    }
    if (!ok) { console.log('dev server not ready'); process.exit(1); }
    await sleep(4000); // let real now.gg CDN images load
    await page.screenshot({ path: path.join(SHOTS, `home-${vp.n}-top.png`) });
    await page.evaluate(() => {
      let best = null, bd = 0;
      for (const el of document.querySelectorAll('*')) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.clientHeight > 200) {
          const d = el.scrollHeight - el.clientHeight; if (d > bd) { bd = d; best = el; }
        }
      }
      if (best) { let n = best; while (n && n !== document.documentElement) { n.style.overflow = 'visible'; n.style.height = 'auto'; n.style.maxHeight = 'none'; n = n.parentElement; } document.body.style.height = 'auto'; document.body.style.overflow = 'visible'; document.documentElement.style.height = 'auto'; }
      window.scrollTo(0, 0);
    });
    await sleep(1500);
    await page.screenshot({ path: path.join(SHOTS, `home-${vp.n}-full.png`), fullPage: true });
    await ctx.close();
    console.log('captured', vp.n);
  }
  await b.close();
  console.log('DONE');
})().catch((e) => { console.error(e); process.exit(1); });
