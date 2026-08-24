import type { ReelSpec } from '../engine/schema';
import { SITES } from './sites';
import { makeRng, pick, chance } from '../engine/rng';
import { getCopy, COPY_BACKEND } from '../engine/copy';
import { BATCH_SEED } from './seed';

// Durations (frames @ 30fps)
const D = { Showcase: 540, FeatureFocus: 300, MultiFeature: 360, DeviceStack: 300, QuoteReveal: 300, StatLine: 240 };

// Visual dials. The same site can yield visually distinct reels by varying:
//   - mode (dark / light)  - which section a feature reel targets
//   - scroll pace          - which sections a multi reel combines
// This is what keeps a fixed set of sites generating fresh-feeling content;
// copy variation sits on top of it.

function build(): ReelSpec[] {
  const out: ReelSpec[] = [];

  for (const s of SITES) {
    // per-site rng seeded by batch + slug, so each site varies independently
    const rng = makeRng(`${BATCH_SEED}:${s.slug}`);
    const site = { name: s.name, capture: `captures/${s.slug}/full.png`, imgHeight: s.imgHeight, url: s.url, displayUrl: s.displayUrl };
    const copy = getCopy(COPY_BACKEND, { rng, siteName: s.name, kicker: s.kicker });

    // showcase: mode rotates, copy varies
    out.push({ id: `${s.slug}-showcase`, template: 'Showcase', site,
      hook: copy.showcaseHook, kicker: s.kicker, cta: copy.showcaseCta,
      durationInFrames: D.Showcase, mode: chance(rng, 0.25) ? 'light' : 'dark' });

    // devicestack: montage, copy varies
    out.push({ id: `${s.slug}-stack`, template: 'DeviceStack', site,
      hook: copy.deviceStackHook, kicker: '', cta: '',
      durationInFrames: D.DeviceStack, mode: 'dark' });

    // one FeatureFocus per feature band, kicker + benefit vary
    for (const f of s.features) {
      out.push({ id: `${s.slug}-${f.key}`, template: 'FeatureFocus', site,
        hook: '', kicker: copy.featureKicker, cta: '',
        durationInFrames: D.FeatureFocus, mode: chance(rng, 0.2) ? 'light' : 'dark',
        feature: { ...f, benefit: copy.featureBenefit(f.label, f.key, f.benefit) } });
    }

    // MultiFeature if 2+ features: rotate which sections it combines
    if (s.features.length >= 2) {
      const shuffled = [...s.features].sort(() => rng() - 0.5).slice(0, 3);
      out.push({ id: `${s.slug}-multi`, template: 'MultiFeature', site,
        hook: '', kicker: copy.multiKicker, cta: '', durationInFrames: D.MultiFeature, mode: 'dark',
        features: shuffled.map((f) => ({ ...f, benefit: copy.featureBenefit(f.label, f.key, f.benefit) })) });
    }

    // QuoteReveal per real testimonial
    for (let i = 0; i < (s.quotes ?? []).length; i++) {
      out.push({ id: `${s.slug}-quote-${i + 1}`, template: 'QuoteReveal', site,
        hook: '', kicker: '', cta: '', durationInFrames: D.QuoteReveal, mode: 'dark',
        quote: s.quotes![i] });
    }

    // StatLine per real stat
    for (let i = 0; i < (s.stats ?? []).length; i++) {
      out.push({ id: `${s.slug}-stat-${i + 1}`, template: 'StatLine', site,
        hook: '', kicker: s.stats![i].kicker, cta: '', durationInFrames: D.StatLine, mode: 'dark',
        stat: { value: s.stats![i].value, label: s.stats![i].label } });
    }
  }
  return out;
}

export const REELS: ReelSpec[] = build();