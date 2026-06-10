// Homepage full-height re-capture: now.gg scrolls an INNER container, not the window.
// Detect the real scroller, scroll it to load lazy content, then expand it so fullPage captures everything.
const { chromium } = require('playwright');
const path = require('path');
const SHOTS = 'N:/Antigravity Main/nowgg/design-source/screenshots';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function dismissConsent(page) {
  for (const label of ['Agree', 'Accept all', 'Accept All', 'Accept', 'I Agree', 'Got it', 'OK']) {
    try { const l = page.getByRole('button', { name: label, exact: false });
      if (await l.count()) { await l.first().click({ timeout: 2000 }); await sleep(1500); return; } } catch (e) { /* */ }
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, userAgent: UA, locale: 'en-US' });
    await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
    const page = await ctx.newPage();
    console.log(`\n=== home-${vp.name} ===`);
    await page.goto('https://now.gg/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(5000);
    await dismissConsent(page);
    try { await page.waitForLoadState('networkidle', { timeout: 20000 }); } catch (e) { /* */ }

    // tag the real scroll container (max scrollHeight-clientHeight among overflow auto/scroll els)
    const delta = await page.evaluate(() => {
      let best = null, bd = 0;
      for (const el of document.querySelectorAll('*')) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.clientHeight > 300) {
          const d = el.scrollHeight - el.clientHeight;
          if (d > bd) { bd = d; best = el; }
        }
      }
      if (best) best.setAttribute('data-scroller', '1');
      return bd;
    });
    console.log(`scroller delta=${delta}`);

    // incremental scroll of the container (or window fallback) to trigger lazy load
    for (let i = 0; i < 24; i++) {
      const atBottom = await page.evaluate(() => {
        const el = document.querySelector('[data-scroller="1"]');
        if (el) { el.scrollBy(0, Math.round(el.clientHeight * 0.85)); return (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 8); }
        window.scrollBy(0, Math.round(window.innerHeight * 0.85));
        return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 8);
      });
      await sleep(2500);
      if (atBottom) break;
    }
    await sleep(2000);

    // expand the scroller + ancestors so the document grows, then fullPage capture
    await page.evaluate(() => {
      const el = document.querySelector('[data-scroller="1"]');
      const reset = (n) => { n.style.overflow = 'visible'; n.style.height = 'auto'; n.style.maxHeight = 'none'; };
      let node = el;
      while (node && node !== document.documentElement) { reset(node); node = node.parentElement; }
      reset(document.body); reset(document.documentElement);
      window.scrollTo(0, 0);
    });
    await sleep(2500);
    try { await page.screenshot({ path: path.join(SHOTS, `home-${vp.name}-full-v2.png`), fullPage: true }); console.log('captured full-v2'); }
    catch (e) { console.log('capture fail:', e.message); }
    await ctx.close();
  }
  await browser.close();
  console.log('\nDONE');
})().catch((e) => { console.error('FATAL', e); process.exit(1); });
