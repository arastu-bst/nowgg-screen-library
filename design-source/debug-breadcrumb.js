// Diagnostic: dump anchors + text nodes in the last 2500px of the live play page
// to find how the breadcrumb actually renders (text, casing, structure).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const URL = 'https://now.gg/apps/recloak/52097/little-alchemy-2.html';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tagScroll(p) {
  return p.evaluate(() => { let best = null, bd = 0; for (const el of document.querySelectorAll('*')) { const oy = getComputedStyle(el).overflowY; if ((oy === 'auto' || oy === 'scroll') && el.clientHeight > 300) { const d = el.scrollHeight - el.clientHeight; if (d > bd) { bd = d; best = el; } } } if (best) best.setAttribute('data-sc', '1'); return bd; });
}
async function scrollAll(p) {
  for (let i = 0; i < 30; i++) {
    const done = await p.evaluate(() => { const el = document.querySelector('[data-sc="1"]'); if (el) { el.scrollBy(0, Math.round(el.clientHeight * 0.85)); return (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 8); } window.scrollBy(0, Math.round(window.innerHeight * 0.85)); return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 8); });
    await sleep(1800); if (done) break;
  }
}

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: 'en-US' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(6000);
  await tagScroll(p); await scrollAll(p); await sleep(2000);
  const data = await p.evaluate(() => {
    const sc = document.querySelector('[data-sc="1"]');
    const sy = sc ? sc.scrollTop : window.scrollY;
    const totalH = sc ? sc.scrollHeight : document.body.scrollHeight;
    const anchors = [...document.querySelectorAll('a')].map((a) => {
      const r = a.getBoundingClientRect();
      return { text: (a.textContent || '').trim().slice(0, 40), href: (a.getAttribute('href') || '').slice(0, 70), y: Math.round(r.y + sy), w: Math.round(r.width) };
    }).filter((a) => a.w > 0 && a.y > totalH - 2500);
    const crumbsByAria = [...document.querySelectorAll('[aria-label*="readcrumb"], .breadcrumb, [class*="readcrumb"], [class*="crumb"]')].map((e) => ({ tag: e.tagName, cls: (e.className || '').toString().slice(0, 80), html: e.outerHTML.slice(0, 300) }));
    return { totalH, url: location.href, anchorsTail: anchors.slice(-60), crumbsByAria };
  });
  fs.writeFileSync(path.join(OUT, 'breadcrumb-debug.json'), JSON.stringify(data, null, 2));
  await p.screenshot({ path: path.join(OUT, 'screens', 'live-page-bottom.png') });
  console.log('url:', data.url, '| totalH:', data.totalH);
  console.log('crumbsByAria:', JSON.stringify(data.crumbsByAria, null, 1).slice(0, 800));
  console.log('tail anchors:', data.anchorsTail.map((a) => `${a.y}:"${a.text}"`).join(' | ').slice(0, 2200));
  await ctx.close(); await b.close(); console.log('DONE');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
