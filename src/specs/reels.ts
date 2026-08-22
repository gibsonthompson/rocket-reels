import type { ReelSpec } from '../engine/schema';
import { SITES } from './sites';

// Durations (frames @30fps)
const SHOWCASE = 540;   // 18s
const FEATURE = 300;    // 10s

// Generate all reels from the site configs: one showcase + one per feature.
function build(): ReelSpec[] {
  const out: ReelSpec[] = [];
  for (const s of SITES) {
    out.push({
      id: `${s.slug}-showcase`,
      template: 'Showcase',
      site: { name: s.name, capture: `captures/${s.slug}/full.png`, imgHeight: s.imgHeight, url: s.url },
      hook: s.showcaseHook,
      kicker: s.kicker,
      cta: 'We build sites like this.',
      durationInFrames: SHOWCASE,
      mode: 'dark',
    });
    for (const f of s.features) {
      out.push({
        id: `${s.slug}-${f.key}`,
        template: 'FeatureFocus',
        site: { name: s.name, capture: `captures/${s.slug}/full.png`, imgHeight: s.imgHeight, url: s.url },
        hook: '',
        kicker: 'The Feature That Wins Jobs',
        cta: '',
        durationInFrames: FEATURE,
        mode: 'dark',
        feature: f,
      });
    }
  }
  return out;
}

export const REELS: ReelSpec[] = build();