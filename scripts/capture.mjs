// Captures live client sites for use as reel subjects.
// Usage: node scripts/capture.mjs
//
// CRITICAL: scrolls through the whole page first so lazy-loaded images and
// sections actually render, THEN screenshots. Without this, long pages capture
// with large blank white gaps where content never loaded.
//
// Writes:
//   public/captures/<slug>/full.png   - what the reels read
//   public/captures/<slug>/height.txt - pixel height for sites.ts
//   captures-download/<slug>-full.png  - uniquely named copy
//   captures-download/heights.json     - all heights
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITES = [
  { slug: 'haulitall',  url: 'https://haul-it-all.vercel.app' },
  { slug: 'jblawn',     url: 'https://jblawn.vercel.app' },
  { slug: 'greenline',  url: 'https://www.greenlinelawncarellc.com/' },
  { slug: 'eastwood',   url: 'https://eastwood-site.vercel.app' },
  { slug: 'southern',   url: 'https://southern-beacon.vercel.app' },
  { slug: 'globalmax',  url: 'https://global-max-services.vercel.app' },
  { slug: 'deadhead',   url: 'https://deadhead-trucking.vercel.app' },
  { slug: 'cocina',     url: 'https://la-cocina-de-jeannie.vercel.app' },
  { slug: 'gtc',        url: 'https://gtc-group-website.vercel.app' },
  { slug: 'rsa',        url: 'https://reliable-solutions-atlanta.vercel.app' },
  { slug: 'strickland', url: 'https://www.stricklandsurfacepreparation.com/' },
];

const OUT = path.join(process.cwd(), 'public', 'captures');
const DL = path.join(process.cwd(), 'captures-download');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(DL, { recursive: true });

// Scroll the whole page in steps, waiting at each, so lazy content loads.
async function loadEverything(pg) {
  await pg.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(window.innerHeight * 0.8);
    let y = 0;
    const maxScroll = () => document.body.scrollHeight - window.innerHeight;
    // scroll down in steps
    while (y < maxScroll()) {
      window.scrollTo(0, y);
      await sleep(220);            // let images in view begin loading
      y += step;
    }
    window.scrollTo(0, maxScroll());
    await sleep(500);
    // wait for any <img> still loading to finish (or time out)
    const imgs = Array.from(document.images);
    await Promise.race([
      Promise.all(imgs.map((img) => img.complete ? null : new Promise((res) => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      }))),
      sleep(4000),
    ]);
    window.scrollTo(0, 0);
    await sleep(400);
  });
}

const run = async () => {
  const b = await chromium.launch();
  const heights = {};
  for (const s of SITES) {
    const dir = path.join(OUT, s.slug);
    fs.mkdirSync(dir, { recursive: true });
    const pg = await b.newPage({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 });
    try {
      await pg.goto(s.url, { waitUntil: 'networkidle', timeout: 40000 });
      await pg.waitForTimeout(1200);
      await loadEverything(pg);       // <-- the fix: trigger lazy loading
      await pg.waitForTimeout(600);
      const projectPath = path.join(dir, 'full.png');
      const namedPath = path.join(DL, `${s.slug}-full.png`);
      await pg.screenshot({ path: projectPath, fullPage: true });
      fs.copyFileSync(projectPath, namedPath);
      const h = await pg.evaluate(() => document.body.scrollHeight) * 2;
      fs.writeFileSync(path.join(dir, 'height.txt'), String(h));
      heights[s.slug] = h;
      console.log(`${s.slug}: imgHeight ${h}px`);
    } catch (e) {
      console.log(`${s.slug}: FAIL ${String(e).slice(0, 70)}`);
    }
    await pg.close();
  }
  fs.writeFileSync(path.join(DL, 'heights.json'), JSON.stringify(heights, null, 2));
  await b.close();
  console.log('\nDone.');
};
run();