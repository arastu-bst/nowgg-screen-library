// Precise geometry measurement of the live now.gg PLAY page (Little Alchemy 2).
// Captures the player-hero left column (ads + "Ads help keep now.gg Free!" divider +
// game-icon rail), the hero/canvas region, ad-slot sizes, and the Popular Games tiles.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const URL = 'https://now.gg/apps/recloak/52097/little-alchemy-2.html';
const OUT = 'N:/Antigravity Main/nowgg/design-source/play';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync(path.join(OUT, 'screens'), { recursive: true });

async function dismiss(p) {
  for (const l of ['Agree', 'Accept all', 'Accept', 'I Agree', 'Got it']) {
    try { const x = p.getByRole('button', { name: l, exact: false }); if (await x.count()) { await x.first().click({ timeout: 2000 }); await sleep(1500); return; } } catch (e) { /* */ }
  }
}

function measure() {
  const R = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  const S = (el) => { const c = getComputedStyle(el); return { bg: c.backgroundColor, radius: c.borderRadius, border: c.border, gap: c.gap, pad: c.padding, fs: c.fontSize, fw: c.fontWeight, color: c.color }; };

  // 1) the "Ads help keep now.gg Free!" divider text + its ad column ancestor
  let adsHelp = null, adColumn = null;
  for (const el of document.querySelectorAll('*')) {
    if (el.children.length === 0 && /Ads help keep now\.gg Free/i.test(el.textContent)) {
      adsHelp = { rect: R(el), style: S(el), text: el.textContent.trim() };
      // walk up to the column that holds both ads (a tall narrow container on the left)
      let n = el.parentElement, hops = 0;
      while (n && hops < 6) { const r = n.getBoundingClientRect(); if (r.height > 350 && r.width < 320 && r.x < 360) { adColumn = { rect: R(n), style: S(n), cls: (typeof n.className === 'string' ? n.className : '').slice(0, 60) }; } n = n.parentElement; hops++; }
      break;
    }
  }

  // 2) ad slots — google ins/iframe + any fixed IAB-sized boxes
  const adSizes = [[300,250],[336,280],[160,600],[300,600],[120,600],[970,90],[728,90],[320,50],[320,100],[468,60],[250,250],[200,200]];
  const ads = [];
  for (const el of document.querySelectorAll('ins.adsbygoogle, iframe[id*="google_ads"], iframe[src*="ads"], iframe[id*="aswift"], div[id*="ad"], div[class*="ad-"], ins, iframe')) {
    const r = el.getBoundingClientRect(); if (r.width < 80 || r.height < 40) continue;
    const w = Math.round(r.width), h = Math.round(r.height);
    const iab = adSizes.find(([aw, ah]) => Math.abs(aw - w) <= 4 && Math.abs(ah - h) <= 4);
    ads.push({ tag: el.tagName.toLowerCase(), id: (el.id || '').slice(0, 40), rect: R(el), iab: iab ? iab.join('x') : null });
  }

  // 3) left-region game-icon rail: small square imgs in a narrow column x<420, stacked vertically
  const railImgs = [...document.querySelectorAll('img')].map((i) => ({ i, r: i.getBoundingClientRect() }))
    .filter(({ r }) => r.x < 420 && r.width >= 36 && r.width <= 90 && Math.abs(r.width - r.height) <= 8 && r.y > 40)
    .sort((a, b) => a.r.y - b.r.y);
  let rail = null;
  if (railImgs.length >= 3) {
    const first = railImgs[0], second = railImgs[1];
    const wrap = first.i.closest('a') || first.i.parentElement;
    rail = {
      count: railImgs.length,
      icon: R(first.i),
      iconStyle: S(first.i),
      wrap: wrap ? { rect: R(wrap), style: S(wrap) } : null,
      vGap: Math.round(second.r.y - (first.r.y + first.r.height)),
      colX: Math.round(first.r.x),
      colRight: Math.round(Math.max(...railImgs.map(({ r }) => r.x + r.width))),
    };
  }

  // 4) hero / canvas region: the large box right of the rail in the first viewport
  let hero = null;
  let bestArea = 0;
  for (const el of document.querySelectorAll('div, section')) {
    const r = el.getBoundingClientRect();
    if (r.y < 40 || r.y > 200) continue;
    if (r.x < 380) continue; // right of the left column
    if (r.width < 500 || r.height < 300) continue;
    const a = r.width * r.height; if (a > bestArea && r.y < 220) { bestArea = a; hero = { rect: R(el), style: S(el), cls: (typeof el.className === 'string' ? el.className : '').slice(0, 60) }; }
  }

  // 5) Popular Games tiles (first section heading h3 == 'Popular Games')
  let popular = null;
  const h = [...document.querySelectorAll('h1,h2,h3')].find((x) => /^Popular Games/i.test(x.textContent.trim()));
  if (h) {
    const sec = h.closest('section') || h.parentElement?.parentElement || h.parentElement;
    const tiles = sec ? [...sec.querySelectorAll('img')].map((i) => ({ i, r: i.getBoundingClientRect() })).filter(({ r }) => r.width > 90).sort((a, b) => a.r.x - b.r.x) : [];
    if (tiles.length >= 2) {
      popular = { heading: S(h), headingRect: R(h), tile: R(tiles[0].i), tileStyle: S(tiles[0].i), hGap: Math.round(tiles[1].r.x - (tiles[0].r.x + tiles[0].r.width)), sectionX: Math.round((sec || h).getBoundingClientRect().x), sectionW: Math.round((sec || h).getBoundingClientRect().width) };
    }
  }

  // 6) main content container width (for the sections rhythm)
  let container = null;
  if (h) { const sec = h.closest('section'); if (sec) container = R(sec); }

  return { viewport: { w: window.innerWidth, h: window.innerHeight }, adsHelp, adColumn, ads, rail, hero, popular, container, scrollH: document.body.scrollHeight };
}

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: 'en-US' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(5000); await dismiss(p); await sleep(2000);
  try { await p.waitForLoadState('networkidle', { timeout: 20000 }); } catch (e) { /* */ }
  await sleep(3000);
  const data = await p.evaluate(measure);
  fs.writeFileSync(path.join(OUT, 'play-geometry.json'), JSON.stringify(data, null, 2));
  await p.screenshot({ path: path.join(OUT, 'screens', 'desktop-measure.png') });
  console.log('ads=' + data.ads.length + ' rail=' + (data.rail ? data.rail.count : 0) + ' adsHelp=' + !!data.adsHelp + ' hero=' + !!data.hero + ' popular=' + !!data.popular);
  console.log(JSON.stringify({ rail: data.rail, adColumn: data.adColumn, adsHelp: data.adsHelp, hero: data.hero }, null, 1));
  await ctx.close(); await b.close(); console.log('DONE');
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
