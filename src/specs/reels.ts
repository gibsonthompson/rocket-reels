import type { ReelSpec } from '../engine/schema';
import { SITES } from './sites';

// Durations (frames @ 30fps)
const D = { Showcase: 540, FeatureFocus: 300, MultiFeature: 360, DeviceStack: 300, QuoteReveal: 300, StatLine: 240 };

// Generate reels from site configs. Each site yields, when data allows:
//   - 1 Showcase (always)
//   - 1 DeviceStack (always: montage of the same site)
//   - 1 FeatureFocus per feature band
//   - 1 MultiFeature if the site has 2+ feature bands
//   - 1 QuoteReveal per testimonial
//   - 1 StatLine per stat
// This keeps the mix ~80% product / ~20% text across a batch.
function build(): ReelSpec[] {
  const out: ReelSpec[] = [];
  for (const s of SITES) {
    const site = { name: s.name, capture: `captures/${s.slug}/full.png`, imgHeight: s.imgHeight, url: s.url };

    out.push({ id: `${s.slug}-showcase`, template: 'Showcase', site,
      hook: s.showcaseHook, kicker: s.kicker, cta: 'We build sites like this.',
      durationInFrames: D.Showcase, mode: 'dark' });

    out.push({ id: `${s.slug}-stack`, template: 'DeviceStack', site,
      hook: 'Built to be seen on a phone.', kicker: '', cta: '',
      durationInFrames: D.DeviceStack, mode: 'dark' });

    for (const f of s.features) {
      out.push({ id: `${s.slug}-${f.key}`, template: 'FeatureFocus', site,
        hook: '', kicker: 'The Feature That Wins Jobs', cta: '',
        durationInFrames: D.FeatureFocus, mode: 'dark', feature: f });
    }

    if (s.features.length >= 2) {
      out.push({ id: `${s.slug}-multi`, template: 'MultiFeature', site,
        hook: '', kicker: '', cta: '', durationInFrames: D.MultiFeature, mode: 'dark',
        features: s.features.slice(0, 3) });
    }

    for (let i = 0; i < (s.quotes ?? []).length; i++) {
      out.push({ id: `${s.slug}-quote-${i + 1}`, template: 'QuoteReveal', site,
        hook: '', kicker: '', cta: '', durationInFrames: D.QuoteReveal, mode: 'dark',
        quote: s.quotes![i] });
    }

    for (let i = 0; i < (s.stats ?? []).length; i++) {
      out.push({ id: `${s.slug}-stat-${i + 1}`, template: 'StatLine', site,
        hook: '', kicker: s.stats![i].kicker, cta: '', durationInFrames: D.StatLine, mode: 'dark',
        stat: { value: s.stats![i].value, label: s.stats![i].label } });
    }
  }
  return out;
}

export const REELS: ReelSpec[] = build();