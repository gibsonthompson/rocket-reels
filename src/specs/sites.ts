// Per-site config. THIS IS THE ONE FILE YOU EDIT to add reels.
// After `npm run capture`, put the printed imgHeight here, eye the full.png to
// pick feature bands, and add any real testimonials/stats. The generator turns
// each site into a full set of reels across all templates.

export type FeatureBand = { key: string; label: string; startPct: number; endPct: number; benefit: string };
export type Quote = { text: string; attribution: string };
export type Stat = { value: string; label: string; kicker: string };

export type SiteConfig = {
  slug: string;
  name: string;
  url: string;
  imgHeight: number;
  kicker: string;
  showcaseHook: string;
  features: FeatureBand[];
  quotes?: Quote[];   // real testimonials only
  stats?: Stat[];     // true, defensible claims only
};

export const SITES: SiteConfig[] = [
  {
    slug: 'haulitall',
    name: 'Haul It All',
    url: 'https://haul-it-all.vercel.app',
    imgHeight: 34208,
    kicker: 'Junk Removal, Metro Atlanta',
    showcaseHook: 'A site that turns visitors into booked jobs.',
    features: [
      { key: 'estimate', label: 'Instant Quote, With A Photo', startPct: 0.052, endPct: 0.118,
        benefit: 'Customers get a real price in minutes. You get the lead the second they hit send.' },
      { key: 'areas', label: 'Every City You Serve', startPct: 0.30, endPct: 0.36,
        benefit: 'A page for each area, so search puts you on the map.' },
      { key: 'reviews', label: 'Real Reviews, Up Front', startPct: 0.62, endPct: 0.70,
        benefit: 'Proof from real customers, right where it counts.' },
    ],
    stats: [
      { value: '2s', label: 'How fast a site should load before a customer leaves.', kicker: 'Speed Wins Jobs' },
    ],
  },
];