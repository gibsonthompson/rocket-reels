// Per-site config. THIS IS THE ONE FILE YOU EDIT to add or tune reels.
// Heights come from `npm run capture` (public/captures/<slug>/height.txt).
// Feature bands are fractions of the full-page capture; verify by eyeing full.png.
// Only real testimonials go in `quotes`; only true claims go in `stats`.

export type FeatureBand = { key: string; label: string; startPct: number; endPct: number; benefit: string };
export type Quote = { text: string; attribution: string };
export type Stat = { value: string; label: string; kicker: string };

export type SiteConfig = {
  slug: string;
  name: string;
  url: string;
  imgHeight: number;
  displayUrl?: string;   // real domain shown on screen; omit if only a vercel.app URL exists
  kicker: string;
  showcaseHook: string;
  features: FeatureBand[];
  quotes?: Quote[];
  stats?: Stat[];
};

// Every site gets a Showcase + DeviceStack automatically (no bands needed).
// FeatureFocus/MultiFeature appear where feature bands are defined.
// Bands are set only where the section location is verified; add more after
// eyeing each full.png. Lanier omitted (capture too short to showcase well).

export const SITES: SiteConfig[] = [
  {
    slug: 'haulitall', name: 'Haul It All', url: 'https://haul-it-all.vercel.app',
    imgHeight: 34208, kicker: 'Junk Removal, Metro Atlanta', displayUrl: 'choosehaulitall.com',
    showcaseHook: 'A site that turns visitors into booked jobs.',
    features: [
      { key: 'estimate', label: 'Instant Quote, With A Photo', startPct: 0.052, endPct: 0.118,
        benefit: 'Customers get a real price in minutes. You get the lead the second they hit send.' },
    ],
    stats: [
      { value: '2s', label: 'How fast a site should load before a customer leaves.', kicker: 'Speed Wins Jobs' },
    ],
  },
  {
    slug: 'jblawn', name: 'JB Lawn Care & Hauling', url: 'https://jblawn.vercel.app',
    imgHeight: 33368, kicker: 'Lawn Care, East Bay', displayUrl: 'jblawncareandhauling.com',
    showcaseHook: 'Lawn care that books the job while you work.',
    features: [],
  },
  {
    slug: 'greenline', name: 'Green Line Lawn Care', url: 'https://greenline.vercel.app',
    imgHeight: 9404, kicker: 'Lawn Care', displayUrl: 'greenlinelawncarellc.com',
    showcaseHook: 'Clean, fast, and built to convert.',
    features: [],
  },
  {
    slug: 'eastwood', name: 'Eastwood', url: 'https://eastwood-site.vercel.app',
    imgHeight: 30782, kicker: 'Home Services', 
    showcaseHook: 'A site that looks as good as the work.',
    features: [],
  },
  {
    slug: 'southern', name: 'Southern Beacon', url: 'https://southern-beacon.vercel.app',
    imgHeight: 29274, kicker: 'Service Business', displayUrl: 'southernbeaconenvironmental.com',
    showcaseHook: 'Built to be found and built to convert.',
    features: [],
  },
  {
    slug: 'globalmax', name: 'Global Max Services', url: 'https://global-max-services.vercel.app',
    imgHeight: 27704, kicker: 'Service Business', displayUrl: 'globalmaxservices.com',
    showcaseHook: 'A site that works as hard as the crew.',
    features: [],
  },
  {
    slug: 'deadhead', name: 'Deadhead Trucking', url: 'https://deadhead-trucking.vercel.app',
    imgHeight: 15060, kicker: 'Logistics',
    showcaseHook: 'A site that keeps the trucks full.',
    features: [],
  },
  {
    slug: 'cocina', name: 'La Cocina de Jeannie', url: 'https://la-cocina-de-jeannie.vercel.app',
    imgHeight: 19078, kicker: 'Restaurant', 
    showcaseHook: 'A menu that makes them hungry.',
    features: [],
  },
  {
    slug: 'gtc', name: 'The GTC Group', url: 'https://gtc-group-website.vercel.app',
    imgHeight: 11616, kicker: 'Logistics Advisory', displayUrl: 'globaltransportconsultinggroup.com',
    showcaseHook: 'A site that closes carrier deals.',
    features: [],
    stats: [
      { value: '$500M+', label: 'In freight managed. Numbers that build trust on sight.', kicker: 'Proof Up Front' },
    ],
  },
  {
    slug: 'rsa', name: 'Reliable Solutions Atlanta', url: 'https://reliable-solutions-atlanta.vercel.app',
    imgHeight: 15488, kicker: 'Waterproofing, Atlanta', displayUrl: 'waterhelpme.com',
    showcaseHook: 'A site that turns a leak into a lead.',
    features: [
      { key: 'quote', label: 'Request A Free Quote', startPct: 0.055, endPct: 0.128,
        benefit: 'Name, phone, property, service. The lead lands the moment they submit.' },
      { key: 'reviews', label: 'Real Customer Reviews', startPct: 0.26, endPct: 0.42,
        benefit: 'Real names, real jobs. Proof that closes the next one.' },
    ],
  },
  {
    slug: 'strickland', name: 'Strickland Surface Preparation', url: 'https://www.stricklandsurfacepreparation.com/',
    imgHeight: 15148, kicker: 'Abrasive Blasting, Hall County GA', displayUrl: 'stricklandsurfacepreparation.com',
    showcaseHook: 'A site that brings the job to the crew.',
    features: [],
  },
];