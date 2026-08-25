// Renders every reel to out/<id>.mp4. Sequential so memory stays sane.
// Usage: node scripts/render-all.mjs [--scale 2]
//
// First run downloads Chrome Headless Shell (~93MB, one time). If that hasn't
// happened yet, run `npx remotion browser ensure` once and let it finish.
import { execSync } from 'child_process';
import fs from 'fs';

const scaleArg = process.argv.includes('--scale')
  ? process.argv[process.argv.indexOf('--scale') + 1] : '2';

fs.mkdirSync('out', { recursive: true });

// Get composition ids. --quiet prints them space- and/or newline-separated,
// so split on ALL whitespace, not just newlines.
const raw = execSync('npx remotion compositions src/index.ts --quiet', { encoding: 'utf8' });
const ids = raw.split(/\s+/).map((s) => s.trim()).filter(Boolean);

console.log(`Rendering ${ids.length} reels at scale ${scaleArg}...\n`);

let ok = 0, failed = [];
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const out = `out/${id}.mp4`;
  process.stdout.write(`  [${i + 1}/${ids.length}] ${id} ... `);
  try {
    // inherit stdio so the one-time browser download and any real error is visible
    execSync(`npx remotion render src/index.ts ${id} ${out} --scale ${scaleArg} --log=error`,
      { stdio: ['ignore', 'ignore', 'inherit'] });
    console.log('done');
    ok++;
  } catch (e) {
    console.log('FAILED');
    failed.push(id);
  }
}

console.log(`\nBatch complete: ${ok}/${ids.length} rendered to out/.`);
if (failed.length) console.log('Failed:', failed.join(', '));