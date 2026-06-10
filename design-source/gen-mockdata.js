// Generate src/lib/mock-data.ts from the real extracted now.gg assets.
const fs = require('fs');
const OUT = 'N:/Antigravity Main/nowgg';
const read = (f) => JSON.parse(fs.readFileSync(`${OUT}/design-source/${f}`, 'utf8'));
const home = read('tokens-home-desktop.json');
const game = read('tokens-game-desktop.json');

const genres = ['Action', 'Simulation', 'Adventure', 'Racing', 'Puzzle', 'Strategy', 'Casual', 'Arcade'];
const ratingPool = [4.55, 4.61, 4.32, 4.78, 4.21, 4.89, 3.97, 4.43, 4.66, 4.12];
const titleOf = (alt) => alt.replace(/^Play /, '').replace(/ online.*$| on .*$/i, '').trim();
const idOf = (t, i) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `g-${i}`;
const pick = (arr, n, off = 0) => Array.from({ length: n }, (_, i) => arr[(i + off) % arr.length]);

// ---- Game icons: real 128px "Play X" icons ----
const seenG = new Set();
const games = [];
for (const d of [home, game]) {
  for (const img of d.images || []) {
    if (!img.src || !img.src.startsWith('http') || img.w !== 128 || !/^Play /.test(img.alt || '')) continue;
    const t = titleOf(img.alt); if (!t || seenG.has(t)) continue; seenG.add(t); games.push({ title: t, icon: img.src });
  }
}
const GAMES = games.map((g, i) => ({ id: idOf(g.title, i), title: g.title, icon: g.icon, rating: ratingPool[i % ratingPool.length], genre: genres[i % genres.length] }));

// ---- Portrait posters: real 256-wide key-art "Play X" (Popular Games row) ----
const seenP = new Set();
const posters = [];
for (const d of [home, game]) {
  for (const img of d.images || []) {
    if (!img.src || !img.src.startsWith('http') || !img.w || img.w < 200 || img.w > 320 || !/^Play /.test(img.alt || '')) continue;
    const t = titleOf(img.alt); if (!t || seenP.has(t)) continue; seenP.add(t); posters.push({ title: t, poster: img.src });
  }
}
const POSTERS = posters.map((p, i) => ({ id: idOf(p.title, i), title: p.title, poster: p.poster, rating: ratingPool[(i + 3) % ratingPool.length], genre: genres[(i + 2) % genres.length] }));

// ---- Wide 16:9 covers: real game-page cms-media landscape art (article cards) ----
const WIDE = [...new Set((game.images || []).filter((i) => i.src && i.src.startsWith('http') && i.w >= 400 && i.w > i.h * 1.3).map((i) => i.src))];
const coverAt = (i) => WIDE[i % WIDE.length] || POSTERS[i % POSTERS.length].poster;

// ---- Articles (Blogs + Top Picks): real titles from the live site, real 16:9 art ----
const BLOG_TITLES = [
  'Dive into the Wild World of Italian Brainrot: Play Games on now.gg & Chat with Characters online',
  'wsup.ai - Free AI Chatbot to Talk to AI Characters Online',
  'Top 5 Free AI Image Generators for Gaming Art (Avatars, Thumbnails, Concept Art)',
];
const TOP_PICK_TITLES = [
  'Top 5 Games like Gacha Club for All Character Creating Fans in 2024',
  'Alternatives to Character AI That You Need to Try Out',
  'The Best Jigsaw Games Online for Endless Puzzle Fun',
];
const BLOGS = BLOG_TITLES.map((title, i) => ({ id: `blog-${i}`, title, cover: coverAt(i) }));
const TOP_PICKS = TOP_PICK_TITLES.map((title, i) => ({ id: `pick-${i}`, title, cover: coverAt(i + 3) }));

// ---- Short videos: real captions + poster art ----
const VIDEO_CAPTIONS = [
  'No Downloads. No Installs. Play games INSTANTLY on now.gg',
  'Did you score? #unblockedgames #school',
  'Play Instantly on now.gg',
  'Breaking game records like OG 😎',
  'Busted gaming on school laptop, but you are still lit 🔥😎',
];
const VIDEOS = VIDEO_CAPTIONS.map((caption, i) => ({ id: `vid-${i}`, caption, poster: POSTERS[(i + 2) % POSTERS.length].poster }));

const ASSETS = {
  logo: 'https://now.gg/6/_next/static/media/nowgg-logo.2eda3eaf.svg',
  star: 'https://now.gg/6/_next/static/media/star.cc9185b5.svg',
  search: 'https://now.gg/6/_next/static/media/gradient-search.0a195319.svg',
  stars: 'https://now.gg/6/_next/static/media/stars.aea97432.svg',
};
const CATEGORIES = ['Browser Games', 'Casual Games', 'Strategy Games', 'Simulation Games', 'Role Playing Games', 'Action Games', 'Adventure Games', 'Puzzle Games', 'Arcade Games', 'Sports Games', 'Casino Games', 'Racing Games', 'Card Games', 'Educational Games', 'Social Games'];

const banner = '// AUTO-GENERATED from design-source extraction (real now.gg assets). Regenerate via design-source/gen-mockdata.js.\n';
const ts = `${banner}
export type Game = { id: string; title: string; icon: string; rating: number; genre: string }
export type Poster = { id: string; title: string; poster: string; rating: number; genre: string }
export type Article = { id: string; title: string; cover: string }
export type Video = { id: string; caption: string; poster: string }

export const ASSETS = ${JSON.stringify(ASSETS, null, 2)} as const
export const GAMES: Game[] = ${JSON.stringify(GAMES)}
export const POSTERS: Poster[] = ${JSON.stringify(POSTERS)}
export const BLOGS: Article[] = ${JSON.stringify(BLOGS, null, 2)}
export const TOP_PICKS: Article[] = ${JSON.stringify(TOP_PICKS, null, 2)}
export const VIDEOS: Video[] = ${JSON.stringify(VIDEOS, null, 2)}
export const CATEGORIES: string[] = ${JSON.stringify(CATEGORIES)}

// section slices
export const TOP_GAMES = GAMES.slice(0, 18)
export const MORE_GAMES = GAMES.slice(6, 24)
export const POPULAR_GAMES: Poster[] = ${JSON.stringify(pick(POSTERS, 10, 0))}
`;

fs.mkdirSync(`${OUT}/src/lib`, { recursive: true });
fs.writeFileSync(`${OUT}/src/lib/mock-data.ts`, ts);
console.log(`games=${GAMES.length} posters=${POSTERS.length} wide=${WIDE.length} blogs=${BLOGS.length} topPicks=${TOP_PICKS.length}`);
