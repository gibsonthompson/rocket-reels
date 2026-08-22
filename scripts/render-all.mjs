// Renders every reel in the project to out/<id>.mp4 at full resolution.
// Usage: node scripts/render-all.mjs [--scale 2] [--concurrency 2]
// Runs them sequentially so a 30-reel batch does not exhaust memory.
import { execSync } from 'child_process';
import fs from 'fs';

const scaleArg = process.argv.includes('--scale')
  ? process.argv[process.argv.indexOf('--scale') + 1] : '2';

fs.mkdirSync('out', { recursive: true });

// Ask Remotion for the composition ids from the bundle.
const ids = execSync('npx remotion compositions src/index.ts --quiet', { encoding: 'utf8' })
  .split('\n').map((l) => l.trim()).filter(Boolean);

console.log(`Rendering ${ids.length} reels at scale ${scaleArg}...`);
let done = 0;
for (const id of ids) {
  const out = `out/${id}.mp4`;
  process.stdout.write(`  [${++done}/${ids.length}] ${id} ... `);
  try {
    execSync(`npx remotion render src/index.ts ${id} ${out} --scale ${scaleArg}`, { stdio: 'ignore' });
    console.log('done');
  } catch (e) {
    console.log('FAIL');
  }
}
console.log(`\nBatch complete. Files in out/.`);
