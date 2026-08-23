// Captures live client sites for use as reel subjects.
// Usage: node scripts/capture.mjs
//
// Writes TWO copies of each capture:
//   public/captures/<slug>/full.png   - what the reels read (keep this path)
//   captures-download/<slug>-full.png - uniquely named, easy to download/inspect
// Also writes height into both a per-site height.txt and a combined heights.json.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITES = [
  { slug: 'haulitall',  url: 'https://haul-it-all.vercel.app' },
  { slug: 'jblawn',     url: 'https://jblawn.vercel.app' },
  { slug: 'greenline',  url: 'https://greenline.vercel.app' },
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

const run = async () => {
  const b = await chromium.launch();
  const heights = {};
  for (const s of SITES) {
    const dir = path.join(OUT, s.slug);
    fs.mkdirSync(dir, { recursive: true });
    const pg = await b.newPage({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 });
    try {
      await pg.goto(s.url, { waitUntil: 'networkidle', timeout: 30000 });
      await pg.waitForTimeout(1500);
      const projectPath = path.join(dir, 'full.png');
      const namedPath = path.join(DL, `${s.slug}-full.png`);
      await pg.screenshot({ path: projectPath, fullPage: true });
      fs.copyFileSync(projectPath, namedPath);
      const h = await pg.evaluate(() => document.body.scrollHeight) * 2;
      fs.writeFileSync(path.join(dir, 'height.txt'), String(h));
      heights[s.slug] = h;
      console.log(`${s.slug}: imgHeight ${h}px  ->  captures-download/${s.slug}-full.png`);
    } catch (e) {
      console.log(`${s.slug}: FAIL ${String(e).slice(0, 60)}`);
    }
    await pg.close();
  }
  fs.writeFileSync(path.join(DL, 'heights.json'), JSON.stringify(heights, null, 2));
  await b.close();
  console.log(`\nDone. Uniquely-named captures + heights.json are in captures-download/`);
};
run();