// Identify the live play-page sections below the player — especially the unlabeled
// poster band between "Popular Games" and "Video Clips". Reports each content block's
// nearest heading, background color, Y position, and sample card geometry.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const URL = 'https://now.gg/apps/recloak/52097/little-alchemy-2.html';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function dismiss(p) {
  for (const l of ['Agree', 'Accept all', 'Accept', 'I Agree', 'Got it']) {
    try { const x = p.getByRole('button', { name: l, exact: false }); if (await x.count()) { await x.first().click({ timeout: 2000 }); await sleep(1500); return; } } catch (e) { /* */ }
  }
}
async function tagScroll(p) {
  return p.evaluate(() => { let best = null, bd = 0; for (const el of document.querySelectorAll('*')) { const oy = getComputedStyle(el).overflowY; if ((oy === 'auto' || oy === 'scroll') && el.clientHeight > 300) { const d = el.scrollHeight - el.clientHeight; if (d > bd) { bd = d; best = el; } } } if (best) best.setAttribute('data-sc', '1'); return bd; });
}
async function scrollAll(p) {
  for (let i = 0; i < 30; i++) {
    const done = await p.evaluate(() => { const el = document.querySelector('[data-sc="1"]'); if (el) { el.scrollBy(0, Math.round(el.clientHeight * 0.85)); return (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 8); } window.scrollBy(0, Math.round(window.innerHeight * 0.85)); return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 8); });
    await sleep(2200); if (done) break;
  }
}

function analyze() {
  const bgOf = (el) => { let n = el; for (let i = 0; i < 6 && n; i++) { const c = getComputedStyle(n).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c; n = n.parentElement; } return 'transparent'; };
  // headings in order
  const heads = [...document.querySelectorAll('h1,h2,h3')].map((h) => { const r = h.getBoundingClientRect(); const cs = getComputedStyle(h); return { text: h.textContent.trim().slice(0, 50), y: Math.round(r.y + (document.querySelector('[data-sc="1"]')?.scrollTop || window.scrollY)), fs: cs.fontSize, fw: cs.fontWeight, align: cs.textAlign }; }).filter((h) => h.text);

  // Find the poster band: look for cards that show a DEVELOPER line (two stacked text
  // lines under an image). Sample a representative "title + dev" card cluster.
  const cards = [];
  for (const img of document.querySelectorAll('img')) {
    const r = img.getBoundingClientRect();
    if (r.width < 120 || r.width > 360) continue;
    if (r.height < r.width * 1.05) continue; // portrait-ish only
    const wrap = img.closest('a') || img.parentElement;
    if (!wrap) continue;
    const texts = [...wrap.querySelectorAll('*')].filter((e) => e.children.length === 0 && e.textContent.trim()).map((e) => e.textContent.trim());
    const sy = document.querySelector('[data-sc="1"]')?.scrollTop || window.scrollY;
    cards.push({ alt: img.alt.slice(0, 30), w: Math.round(r.width), h: Math.round(r.height), aspect: (r.width / r.height).toFixed(2), absY: Math.round(r.y + sy), texts: texts.slice(0, 3), bg: bgOf(img), radius: getComputedStyle(img).borderRadius });
  }
  // de-dup by absY rows
  return { heads, cardCount: cards.length, cards: cards.slice(0, 24) };
}

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: 'en-US' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(5000); await dismiss(p); await sleep(1500);
  await tagScroll(p); await scrollAll(p); await sleep(1500);
  // scroll back to where Popular Games / the band sit, capture a clean shot
  await p.evaluate(() => { const el = document.querySelector('[data-sc="1"]'); const h = [...document.querySelectorAll('h1,h2,h3')].find((x) => /Popular Games/i.test(x.textContent)); if (h && el) { const r = h.getBoundingClientRect(); el.scrollBy(0, r.y - 40); } });
  await sleep(1500);
  await p.screenshot({ path: path.join(OUT, 'screens', 'live-band.png') });
  const data = await p.evaluate(analyze);
  fs.writeFileSync(path.join(OUT, 'sections-analysis.json'), JSON.stringify(data, null, 2));
  console.log('headings:', data.heads.map((h) => `${h.text}@${h.y}(${h.fs}/${h.align})`).join(' | '));
  console.log('portrait cards:', data.cardCount);
  console.log(JSON.stringify(data.cards.slice(0, 8), null, 1));
  await ctx.close(); await b.close(); console.log('DONE');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
