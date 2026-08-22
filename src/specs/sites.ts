// Per-site config. One entry per client site. The generator in reels.ts turns
// each into a showcase reel + one FeatureFocus reel per listed feature.
// imgHeight comes from public/captures/<slug>/height.txt after `npm run capture`.
//
// feature bands (startPct/endPct) are fractions of the full-page capture. Pick
// them by eyeing public/captures/<slug>/full.png. Only list features the site
// actually has. Nothing here is invented.

export type FeatureBand = {
  key: string;        // short id, used in the reel id
  label: string;      // shown on screen, e.g. "Instant Quote, With A Photo"
  startPct: number;
  endPct: number;
  benefit: string;    // the value line
};

export type SiteConfig = {
  slug: string;       // matches public/captures/<slug>/
  name: string;       // business name on screen
  url: string;
  imgHeight: number;  // from height.txt
  kicker: string;     // showcase mono label, e.g. "Junk Removal, Metro Atlanta"
  showcaseHook: string;
  features: FeatureBand[];
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
      // add more real bands after eyeing full.png:
      // { key: 'areas', label: 'Every City You Serve', startPct: ?, endPct: ?, benefit: '...' },
      // { key: 'reviews', label: 'Real Reviews, Front And Center', startPct: ?, endPct: ?, benefit: '...' },
    ],
  },
  // more sites appended here after capture:
  // { slug:'jblawn', name:'JB Lawn Care', url:'...', imgHeight:?, kicker:'...', showcaseHook:'...', features:[...] },
];