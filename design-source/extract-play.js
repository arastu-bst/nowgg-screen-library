// Scrape the live now.gg PLAY page (Little Alchemy 2) — full layout, sections, assets.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const URL = 'https://now.gg/apps/recloak/52097/little-alchemy-2.html';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'screens'), { recursive: true });

async function dismiss(p) {
  for (const l of ['Agree', 'Accept all', 'Accept', 'I Agree', 'Got it']) {
    try { const x = p.getByRole('button', { name: l, exact: false }); if (await x.count()) { await x.first().click({ timeout: 2000 }); await sleep(1200); return; } } catch (e) { /* */ }
  }
}
async function tagScroll(p) {
  return p.evaluate(() => { let best = null, bd = 0; for (const el of document.querySelectorAll('*')) { const oy = getComputedStyle(el).overflowY; if ((oy === 'auto' || oy === 'scroll') && el.clientHeight > 300) { const d = el.scrollHeight - el.clientHeight; if (d > bd) { bd = d; best = el; } } } if (best) best.setAttribute('data-sc', '1'); return bd; });
}
async function scrollAll(p) {
  for (let i = 0; i < 30; i++) {
    const done = await p.evaluate(() => { const el = document.querySelector('[data-sc="1"]'); if (el) { el.scrollBy(0, Math.round(el.clientHeight * 0.85)); return (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 8); } window.scrollBy(0, Math.round(window.innerHeight * 0.85)); return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 8); });
    await sleep(2500); if (done) break;
  }
}
function extract() {
  const inc = (m, k) => { if (k) m[k] = (m[k] || 0) + 1; };
  const headings = [...document.querySelectorAll('h1,h2,h3')].slice(0, 40).map((h) => { const cs = getComputedStyle(h); return { tag: h.tagName.toLowerCase(), text: h.textContent.trim().slice(0, 90), size: cs.fontSize, weight: cs.fontWeight }; });
  const buttons = [...document.querySelectorAll('button, a[class*="btn"], a[class*="button"], [role="button"]')].slice(0, 40).map((b) => { const cs = getComputedStyle(b); return { text: b.textContent.trim().slice(0, 40), bg: cs.backgroundColor, color: cs.color, r: cs.borderRadius }; }).filter((b) => b.text);
  const imgs = [...document.querySelectorAll('img')].slice(0, 100).map((i) => ({ src: i.currentSrc || i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })).filter((i) => i.src && i.src.startsWith('http'));
  function outline(el, d) { if (d > 3 || !el) return null; const kids = [...el.children].filter((c) => ['DIV', 'SECTION', 'HEADER', 'MAIN', 'UL', 'ASIDE', 'ARTICLE', 'NAV'].includes(c.tagName)); return { tag: el.tagName.toLowerCase(), cls: (typeof el.className === 'string' ? el.className : '').slice(0, 80), children: d < 3 ? kids.slice(0, 14).map((c) => outline(c, d + 1)).filter(Boolean) : [] }; }
  return { title: document.title, headings, buttons, imgs, structure: outline(document.querySelector('main') || document.body, 0), scrollHeight: document.body.scrollHeight };
}

(async () => {
  const b = await chromium.launch({ headless: true });
  for (const vp of [{ n: 'desktop', w: 1440, h: 900 }, { n: 'mobile', w: 390, h: 844 }]) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, userAgent: UA, locale: 'en-US' });
    await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(5000); await dismiss(p);
    try { await p.waitForLoadState('networkidle', { timeout: 20000 }); } catch (e) { /* */ }
    await p.screenshot({ path: path.join(OUT, 'screens', `${vp.n}-top.png`) });
    const delta = await tagScroll(p); await scrollAll(p);
    if (vp.n === 'desktop') { const data = await p.evaluate(extract); fs.writeFileSync(path.join(OUT, 'play-data.json'), JSON.stringify(data, null, 2)); console.log(`headings=${data.headings.length} buttons=${data.buttons.length} imgs=${data.imgs.length} scrollH=${data.scrollHeight} scrollerDelta=${delta}`); }
    await p.evaluate(() => { const el = document.querySelector('[data-sc="1"]'); const reset = (n) => { n.style.overflow = 'visible'; n.style.height = 'auto'; n.style.maxHeight = 'none'; }; let n = el; while (n && n !== document.documentElement) { reset(n); n = n.parentElement; } reset(document.body); reset(document.documentElement); window.scrollTo(0, 0); });
    await sleep(2500);
    try { await p.screenshot({ path: path.join(OUT, 'screens', `${vp.n}-full.png`), fullPage: true }); } catch (e) { console.log('full shot fail', vp.n, e.message); }
    await ctx.close();
  }
  await b.close(); console.log('DONE');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
