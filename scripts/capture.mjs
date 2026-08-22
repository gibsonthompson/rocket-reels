// Captures live client sites into public/captures for use as reel subjects.
// Usage: node scripts/capture.mjs
// Produces, per site: full.png (tall full-page) + section crops if selectors hit.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITES = [
  { slug: 'haulitall',  url: 'https://haul-it-all.vercel.app' },
  { slug: 'jblawn',     url: 'https://jblawn.vercel.app' },
  { slug: 'greenline',  url: 'https://greenline.vercel.app' },
  { slug: 'eastwood',   url: 'https://eastwood-site.vercel.app' },
  { slug: 'southern',   url: 'https://southern-beacon.vercel.app' },
  { slug: 'cocina',     url: 'https://la-cocina-de-jeannie.vercel.app' },
];

const OUT = path.join(process.cwd(), 'public', 'captures');
fs.mkdirSync(OUT, { recursive: true });

const run = async () => {
  const b = await chromium.launch();
  for (const s of SITES) {
    const dir = path.join(OUT, s.slug);
    fs.mkdirSync(dir, { recursive: true });
    const pg = await b.newPage({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 });
    try {
      await pg.goto(s.url, { waitUntil: 'networkidle', timeout: 30000 });
      await pg.waitForTimeout(1500);
      await pg.screenshot({ path: path.join(dir, 'full.png'), fullPage: true });
      const h = await pg.evaluate(() => document.body.scrollHeight);
      console.log(`${s.slug}: full.png captured, height ${h}px`);
    } catch (e) {
      console.log(`${s.slug}: FAIL ${String(e).slice(0, 60)}`);
    }
    await pg.close();
  }
  await b.close();
};
run();
