// Scrape the LIVE now.gg footer (structure + links + copyright) — source of truth.
const { chromium } = require('playwright');
const fs = require('fs');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: 'en-US' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const p = await ctx.newPage();
  await p.goto('https://now.gg/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(5000);
  for (const l of ['Agree', 'Accept all', 'Accept', 'I Agree']) {
    try { const x = p.getByRole('button', { name: l, exact: false }); if (await x.count()) { await x.first().click({ timeout: 2000 }); await sleep(1200); break; } } catch (e) { /* */ }
  }
  await p.evaluate(() => { let best = null, bd = 0; for (const el of document.querySelectorAll('*')) { const oy = getComputedStyle(el).overflowY; if ((oy === 'auto' || oy === 'scroll') && el.clientHeight > 300) { const d = el.scrollHeight - el.clientHeight; if (d > bd) { bd = d; best = el; } } } if (best) best.setAttribute('data-sc', '1'); });
  for (let i = 0; i < 30; i++) {
    const done = await p.evaluate(() => { const el = document.querySelector('[data-sc="1"]'); if (el) { el.scrollBy(0, el.clientHeight); return (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 8); } window.scrollBy(0, window.innerHeight); return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 8); });
    await sleep(1400); if (done) break;
  }
  await sleep(2000);
  const data = await p.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return { error: 'no footer element' };
    const links = [...f.querySelectorAll('a')].map((a) => ({ t: (a.innerText || '').trim(), href: a.getAttribute('href') })).filter((x) => x.t);
    const text = f.innerText;
    const imgs = [...f.querySelectorAll('img')].map((i) => ({ src: i.currentSrc || i.src, alt: i.alt })).slice(0, 30);
    return { text, links, imgs };
  });
  fs.writeFileSync('N:/Antigravity Main/nowgg/design-source/live-footer.json', JSON.stringify(data, null, 2));
  const f = await p.$('footer');
  if (f) { await f.scrollIntoViewIfNeeded(); await sleep(800); await f.screenshot({ path: 'N:/Antigravity Main/nowgg/design-source/figma/live-footer.png' }); }
  await b.close();
  console.log('=== FOOTER TEXT ===\n' + ((data.text || data.error || '').slice(0, 1800)));
  console.log('\n=== LINKS (' + (data.links || []).length + ') ===\n' + (data.links || []).map((l) => l.t).join(' | '));
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
