const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3000));
  const info = await p.evaluate(() => {
    const h = document.querySelector('h2');
    const cs = h ? getComputedStyle(h) : null;
    return {
      h2text: h ? h.textContent.slice(0, 30) : 'none',
      h2_fontFamily: cs ? cs.fontFamily : '?',
      h2_fontWeight: cs ? cs.fontWeight : '?',
      h2_fontSize: cs ? cs.fontSize : '?',
      bricolage_600_loaded: document.fonts.check('600 20px "Bricolage Grotesque"'),
      bricolage_400_loaded: document.fonts.check('400 16px "Bricolage Grotesque"'),
      fontsLoaded: [...document.fonts].map((f) => `${f.family} | ${f.weight} | ${f.status}`),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
