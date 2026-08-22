import type { ReelSpec } from '../engine/schema';

// imgHeight = natural px height of public/captures/<slug>/full.png (see height.txt).
export const REELS: ReelSpec[] = [
  {
    id: 'haulitall-showcase',
    template: 'Showcase',
    site: { name: 'Haul It All', capture: 'captures/haulitall/full.png', imgHeight: 34208, url: 'https://haul-it-all.vercel.app' },
    hook: 'A site that turns visitors into booked jobs.',
    kicker: 'Junk Removal, Metro Atlanta',
    cta: 'We build sites like this.',
    durationInFrames: 540,
    mode: 'dark',
  },
  {
    id: 'haulitall-estimate',
    template: 'FeatureFocus',
    site: { name: 'Haul It All', capture: 'captures/haulitall/full.png', imgHeight: 34208, url: 'https://haul-it-all.vercel.app' },
    hook: '',
    kicker: 'The Feature That Wins Jobs',
    cta: '',
    durationInFrames: 300,
    mode: 'dark',
    feature: {
      label: 'Instant Quote, With A Photo',
      startPct: 0.052,
      endPct: 0.118,
      benefit: 'Customers get a real price in minutes. You get the lead the second they hit send.',
    },
  },
];