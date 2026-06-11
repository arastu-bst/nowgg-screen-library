// Verify the Profile sidebar: open it from the TopBar avatar, screenshot desktop +
// mobile, and log the panel/content/footer heights to confirm the full-height fix.
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
    await sleep(2500);
    if (vp.n === 'desktop') {
      // CLOSED state: verify the close/help buttons do NOT leak when the drawer is shut
      await page.screenshot({ path: path.join(SHOTS, 'profile-closed.png'), clip: { x: vp.w - 420 - 90, y: 0, width: 200, height: 240 } });
    }
    await page.click('button[aria-label="Open profile"]');
    await sleep(700); // slide-in
    const dims = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"][aria-label="Profile"]');
      const aside = dialog ? dialog.querySelector('aside') : null;
      const rr = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), h: Math.round(b.height), w: Math.round(b.width) }; };
      const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; props.forEach((p) => (o[p] = s[p])); return o; };
      return {
        viewport: { w: window.innerWidth, h: window.innerHeight },
        dialog: { rect: rr(dialog), css: cs(dialog, ['position', 'top', 'bottom', 'height', 'display']) },
        aside: { rect: rr(aside), css: cs(aside, ['position', 'top', 'bottom', 'height', 'display', 'flexDirection', 'transform']) },
      };
    });
    console.log(vp.n, JSON.stringify(dims));
    await page.screenshot({ path: path.join(SHOTS, `profile-${vp.n}.png`) });
    if (vp.n === 'desktop') {
      // close-up of the protruding flap (panel left edge ≈ vw - 420)
      await page.screenshot({ path: path.join(SHOTS, 'profile-tab.png'), clip: { x: vp.w - 420 - 80, y: 0, width: 170, height: 240 } });
    }
    await ctx.close();
    console.log('captured', vp.n);
  }
  await b.close();
  console.log('DONE');
})().catch((e) => { console.error(e); process.exit(1); });
