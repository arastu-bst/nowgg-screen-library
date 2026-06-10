// now.gg design-token + screenshot extractor (Playwright)
// Honors heavy lazy-load: long post-nav wait + full incremental scroll with pauses.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = 'N:/Antigravity Main/nowgg/design-source';
const SHOTS = path.join(OUT, 'screenshots');

const PAGES = [
  { name: 'home', url: 'https://now.gg/' },
  { name: 'game', url: 'https://now.gg/apps/scott-cawthon/51750/five-nights-at-freddy-s.html' },
];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function dismissConsent(page) {
  for (const label of ['Accept all', 'Accept All', 'Accept', 'I Agree', 'Agree', 'Got it', 'OK', 'Allow all']) {
    try {
      const l = page.getByRole('button', { name: label, exact: false });
      if (await l.count()) { await l.first().click({ timeout: 2000 }); await sleep(1500); return label; }
    } catch (e) { /* ignore */ }
  }
  return null;
}

async function fullScroll(page) {
  const MAX_STEPS = 22;
  for (let i = 0; i < MAX_STEPS; i++) {
    const innerH = await page.evaluate(() => window.innerHeight);
    await page.evaluate((h) => window.scrollBy(0, Math.round(h * 0.85)), innerH);
    await sleep(3000); // pause so lazy content loads before next step
    const atBottom = await page.evaluate(
      () => (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 8)
    );
    if (atBottom) break;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(2000);
}

async function extract(page) {
  return await page.evaluate(() => {
    const inc = (m, k) => { if (!k) return; m[k] = (m[k] || 0) + 1; };
    const colors = {}, bgColors = {}, borderColors = {}, fontFamilies = {}, fontSizes = {},
      fontWeights = {}, lineHeights = {}, letterSpacings = {}, radii = {}, shadows = {},
      paddings = {}, gaps = {};
    const els = Array.from(document.querySelectorAll('*')).slice(0, 4000);
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      inc(colors, cs.color);
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') inc(bgColors, cs.backgroundColor);
      if (cs.borderTopWidth !== '0px') inc(borderColors, cs.borderTopColor);
      inc(fontFamilies, cs.fontFamily);
      inc(fontSizes, cs.fontSize);
      inc(fontWeights, cs.fontWeight);
      inc(lineHeights, cs.lineHeight);
      if (cs.letterSpacing !== 'normal') inc(letterSpacings, cs.letterSpacing);
      if (cs.borderRadius !== '0px') inc(radii, cs.borderRadius);
      if (cs.boxShadow !== 'none') inc(shadows, cs.boxShadow);
      if (cs.padding && cs.padding !== '0px') inc(paddings, cs.padding);
      if (cs.gap && cs.gap !== 'normal') inc(gaps, cs.gap);
    }
    const rootStyle = getComputedStyle(document.documentElement);
    const rootVars = {};
    for (let i = 0; i < rootStyle.length; i++) {
      const p = rootStyle[i];
      if (p.startsWith('--')) rootVars[p] = rootStyle.getPropertyValue(p).trim();
    }
    const fonts = [];
    try { document.fonts.forEach((f) => fonts.push(`${f.family} ${f.weight} ${f.style}`)); } catch (e) { /* */ }
    const images = Array.from(document.querySelectorAll('img')).slice(0, 80)
      .map((img) => ({ src: img.currentSrc || img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight }));
    function outline(el, depth) {
      if (depth > 2 || !el) return null;
      const kids = Array.from(el.children).filter((c) =>
        ['DIV', 'SECTION', 'HEADER', 'FOOTER', 'NAV', 'MAIN', 'UL', 'ASIDE', 'ARTICLE'].includes(c.tagName));
      return {
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === 'string') ? el.className.slice(0, 120) : '',
        id: el.id || '', role: el.getAttribute('role') || '',
        children: depth < 2 ? kids.slice(0, 12).map((c) => outline(c, depth + 1)).filter(Boolean) : [],
      };
    }
    const structure = outline(document.body, 0);
    const headings = Array.from(document.querySelectorAll('h1,h2,h3')).slice(0, 30).map((h) => {
      const cs = getComputedStyle(h);
      return { tag: h.tagName.toLowerCase(), text: h.textContent.trim().slice(0, 80), size: cs.fontSize, weight: cs.fontWeight };
    });
    const buttons = Array.from(document.querySelectorAll('button, a[class*="btn"], a[class*="button"], [role="button"]')).slice(0, 40).map((b) => {
      const cs = getComputedStyle(b);
      return { text: b.textContent.trim().slice(0, 40), bg: cs.backgroundColor, color: cs.color, radius: cs.borderRadius, padding: cs.padding, fontSize: cs.fontSize, fontWeight: cs.fontWeight, border: cs.border };
    });
    return { url: location.href, title: document.title, rootVars, colors, bgColors, borderColors, fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacings, radii, shadows, paddings, gaps, fonts, images, svgCount: document.querySelectorAll('svg').length, structure, headings, buttons, scrollHeight: document.body.scrollHeight };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, userAgent: UA, locale: 'en-US', deviceScaleFactor: 1 });
    await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      const tag = `${p.name}-${vp.name}`;
      console.log(`\n=== ${tag} -> ${p.url} ===`);
      try { await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 60000 }); }
      catch (e) { console.log('goto warn:', e.message); }
      await sleep(5000);
      const consent = await dismissConsent(page);
      if (consent) console.log('dismissed consent via:', consent);
      try { await page.waitForLoadState('networkidle', { timeout: 20000 }); } catch (e) { /* */ }
      await fullScroll(page);
      await sleep(3000);
      let data;
      try { data = await extract(page); }
      catch (e) { console.log('extract error:', e.message); data = { error: e.message, url: p.url }; }
      fs.writeFileSync(path.join(OUT, `tokens-${tag}.json`), JSON.stringify(data, null, 2));
      try { await page.screenshot({ path: path.join(SHOTS, `${tag}-full.png`), fullPage: true }); }
      catch (e) { console.log('fullpage shot fail, viewport only:', e.message); }
      await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(1000);
      try { await page.screenshot({ path: path.join(SHOTS, `${tag}-top.png`) }); } catch (e) { /* */ }
      console.log(`saved ${tag}: title="${data.title || ''}" scrollH=${data.scrollHeight || '?'} imgs=${(data.images || []).length}`);
    }
    await ctx.close();
  }
  await browser.close();
  console.log('\nDONE');
})().catch((e) => { console.error('FATAL', e); process.exit(1); });
