// Measure the live play-page BREADCRUMB bar vs footer. v3: anchor = last
// "Little Alchemy 2" link; climb to trail container; style chain + clipped
// screenshot of the breadcrumb→footer junction.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const URL = 'https://now.gg/apps/recloak/52097/little-alchemy-2.html';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function dismiss(p) {
  for (const l of ['Agree', 'Accept all', 'Accept', 'I Agree', 'Got it', 'Consent']) {
    try { const x = p.getByRole('button', { name: l, exact: false }); if (await x.count()) { await x.first().click({ timeout: 2000 }); await sleep(1500); return l; } } catch (e) { /* */ }
  }
  return null;
}
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
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1200 }, userAgent: UA, locale: 'en-US' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(5000);
  const dismissed = await dismiss(p); await sleep(1500);
  await tagScroll(p); await scrollAll(p); await sleep(2000);

  const data = await p.evaluate(() => {
    const styleOf = (el) => { const cs = getComputedStyle(el); return { bg: cs.backgroundColor, bTop: cs.borderTop, bBottom: cs.borderBottom, pad: cs.padding, mar: cs.margin, font: `${cs.fontSize}/${cs.fontWeight}`, color: cs.color }; };
    // breadcrumb trail = the LAST anchor titled "Little Alchemy 2" that sits near "Browser Games"
    const la = [...document.querySelectorAll('a')].filter((a) => /little alchemy 2/i.test((a.textContent || '').trim()));
    if (!la.length) return { error: 'no Little Alchemy 2 anchors' };
    const crumbLink = la[la.length - 1];
    let trail = crumbLink;
    for (let i = 0; i < 6 && trail.parentElement; i++) { trail = trail.parentElement; if (trail.querySelectorAll('a').length >= 2 && /games/i.test(trail.textContent)) break; }
    const chain = [];
    let n = trail;
    for (let i = 0; i < 7 && n && n !== document.body; i++) { const r = n.getBoundingClientRect(); chain.push({ tag: n.tagName, cls: (n.className || '').toString().slice(0, 90), rect: { x: Math.round(r.x), yV: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, style: styleOf(n) }); n = n.parentElement; }
    const footer = document.querySelector('footer') || [...document.querySelectorAll('div,section')].find((d) => /about us/i.test(d.textContent) && /help center/i.test(d.textContent) && d.getBoundingClientRect().height > 150 && d.getBoundingClientRect().height < 1200);
    const fr = footer ? footer.getBoundingClientRect() : null;
    const tr = trail.getBoundingClientRect();
    return {
      trailHtml: trail.outerHTML.slice(0, 600),
      chain,
      footer: footer ? { tag: footer.tagName, cls: (footer.className || '').toString().slice(0, 90), rect: { yV: Math.round(fr.y), h: Math.round(fr.height) }, bg: getComputedStyle(footer).backgroundColor, pad: getComputedStyle(footer).padding } : null,
      insideFooter: footer ? footer.contains(trail) : null,
      gapViewport: fr ? Math.round(fr.y - (tr.y + tr.height)) : null,
      trailViewportY: Math.round(tr.y),
    };
  });
  fs.writeFileSync(path.join(OUT, 'breadcrumb-analysis.json'), JSON.stringify(data, null, 2));
  console.log('dismissed:', dismissed);
  console.log(JSON.stringify(data, null, 1).slice(0, 3200));

  // clip screenshot around the junction (viewport coords — we're scrolled to bottom).
  // Best-effort: trailViewportY can land outside the viewport after lazy loads; the
  // DOM analysis above is the real evidence, so a failed clip must not fail the run.
  if (!data.error && data.trailViewportY != null) {
    try {
      const top = Math.min(Math.max(0, data.trailViewportY - 120), 1100);
      await p.screenshot({ path: path.join(OUT, 'screens', 'live-breadcrumb-footer.png'), clip: { x: 0, y: top, width: 1440, height: Math.min(700, 1200 - top) } });
    } catch (e) { console.warn('junction screenshot skipped:', e.message.split('\n')[0]); }
  }
  await ctx.close(); await b.close(); console.log('DONE');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
