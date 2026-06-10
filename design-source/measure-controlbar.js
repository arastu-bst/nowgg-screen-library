// Pull the live now.gg player BOTTOM CONTROL BAR from inspect: the help icon, Remove
// Ads button, "Game not loading? / Refresh page!", record + fullscreen icons. The bar
// may only mount after clicking "Play in browser", so we scrape static DOM first, then
// click Play and re-scrape. Dumps icon markup (SVG paths / <i class> font glyphs / img src).
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

function scrape() {
  const out = { texts: {}, icons: [], bars: [] };
  // 1) locate the control-bar anchors by text
  const anchors = ['Remove Ads', 'Refresh page', 'Game not loading', 'Game not loading?'];
  for (const a of anchors) {
    for (const el of document.querySelectorAll('button, a, span, div, p')) {
      if (el.children.length <= 2 && el.textContent.trim().toLowerCase().includes(a.toLowerCase())) {
        const r = el.getBoundingClientRect();
        if (!out.texts[a]) out.texts[a] = { tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 80), html: el.outerHTML.slice(0, 400), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
        break;
      }
    }
  }
  // 2) find the bar container: a wide, short, bottom-anchored flex row holding those anchors
  let bar = null;
  const removeAds = [...document.querySelectorAll('*')].find((el) => el.children.length <= 3 && /remove ads/i.test(el.textContent) && el.getBoundingClientRect().width < 260);
  if (removeAds) {
    let n = removeAds;
    for (let i = 0; i < 8 && n; i++) { const r = n.getBoundingClientRect(); if (r.width > 700 && r.height < 90 && r.height > 30) { bar = n; break; } n = n.parentElement; }
  }
  if (bar) {
    const r = bar.getBoundingClientRect();
    out.bars.push({ cls: (bar.className || '').toString().slice(0, 100), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, bg: getComputedStyle(bar).background.slice(0, 160), html: bar.outerHTML.slice(0, 4000) });
  }
  // 3) enumerate icon-bearing elements (svg, <i> font glyphs, img) anywhere near the bottom
  const seen = new Set();
  for (const el of document.querySelectorAll('svg, i, img, [class*="icon"]')) {
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.width > 60 || r.height < 8 || r.height > 60) continue;
    const tag = el.tagName.toLowerCase();
    let sig = '';
    if (tag === 'svg') sig = 'svg:' + (el.querySelector('path')?.getAttribute('d') || '').slice(0, 60);
    else if (tag === 'i') sig = 'i:' + (el.className || '').toString();
    else if (tag === 'img') sig = 'img:' + (el.getAttribute('src') || '').slice(0, 80);
    else sig = (el.className || '').toString().slice(0, 40);
    if (seen.has(sig)) continue; seen.add(sig);
    const cs = getComputedStyle(el, tag === 'i' ? '::before' : null);
    out.icons.push({ tag, cls: (el.className || '').toString().slice(0, 60), src: tag === 'img' ? (el.getAttribute('src') || '').slice(0, 120) : undefined, d: tag === 'svg' ? (el.querySelector('path')?.getAttribute('d') || el.innerHTML.slice(0, 200)) : undefined, glyph: tag === 'i' ? cs.content : undefined, font: tag === 'i' ? cs.fontFamily : undefined, y: Math.round(r.y) });
  }
  return out;
}

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: 'en-US' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(5000); await dismiss(p); await sleep(2000);

  const before = await p.evaluate(scrape);
  console.log('=== STATIC DOM ===');
  console.log('texts:', Object.keys(before.texts).join(', ') || 'none');
  console.log('bars:', before.bars.length, 'icons:', before.icons.length);

  // try clicking "Play in browser" to mount the player + control bar
  let after = null;
  try {
    const play = p.getByRole('button', { name: /play in browser/i });
    if (await play.count()) { await play.first().click({ timeout: 4000 }); console.log('clicked Play in browser'); }
    else { const alt = p.getByText(/play in browser/i); if (await alt.count()) { await alt.first().click({ timeout: 4000 }); console.log('clicked Play (text)'); } }
    await sleep(9000);
    await p.screenshot({ path: path.join(OUT, 'screens', 'live-afterplay.png') });
    after = await p.evaluate(scrape);
    console.log('=== AFTER PLAY ===');
    console.log('texts:', Object.keys(after.texts).join(', ') || 'none');
    console.log('bars:', after.bars.length, 'icons:', after.icons.length);
  } catch (e) { console.log('play click failed:', e.message); }

  fs.writeFileSync(path.join(OUT, 'controlbar.json'), JSON.stringify({ before, after }, null, 2));
  await ctx.close(); await b.close(); console.log('DONE');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
