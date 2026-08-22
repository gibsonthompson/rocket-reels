import type { ReelSpec } from '../engine/schema';

// imgHeight is the natural pixel height of public/captures/<slug>/full.png.
// Update it if a capture is re-run (heights change with content).
export const REELS: ReelSpec[] = [
  {
    id: 'haulitall-showcase',
    template: 'Showcase',
    site: {
      name: 'Haul It All',
      capture: 'captures/haulitall/full.png',
      imgHeight: 34208,
      url: 'https://haul-it-all.vercel.app',
    },
    hook: 'A site that turns visitors into booked jobs.',
    kicker: 'Junk Removal, Metro Atlanta',
    cta: 'We build sites like this.',
    durationInFrames: 420, // 14s
    mode: 'dark',
  },
];
