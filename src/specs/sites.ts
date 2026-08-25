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
      { value: '2s', label: 'How fast a site should load before a customer leaves.', kicker: 'The math' },
    ],
  },
  {
    slug: 'jblawn', name: 'JB Lawn Care & Hauling', url: 'https://jblawn.vercel.app',
    imgHeight: 33368, kicker: 'Lawn Care, East Bay CA', displayUrl: 'jblawncareandhauling.com',
    showcaseHook: 'Lawn care that books the job while you work.',
    features: [
      { key: 'areas', label: 'Every Area You Serve', startPct: 0.274, endPct: 0.374, benefit: 'A page for each town, so search puts you on the map.' },
      { key: 'reviews', label: 'Real Customer Reviews', startPct: 0.528, endPct: 0.632, benefit: 'Proof from real customers, right where it counts.' },
      { key: 'services', label: 'A Page Per Service', startPct: 0.779, endPct: 0.843, benefit: 'Every service its own page, so each one can rank.' },
    ],
  },
  {
    slug: 'greenline', name: 'Green Line Lawn Care', url: 'https://www.greenlinelawncarellc.com/',
    imgHeight: 36362, displayUrl: 'greenlinelawncarellc.com', kicker: 'Lawn Care, East Bay CA',
    showcaseHook: 'The best-looking yard on the street starts here.',
    features: [
      { key: 'services', label: 'Complete Lawn And Property Care', startPct: 0.075, endPct: 0.185, benefit: 'Everything the yard needs, laid out so customers get it fast.' },
      { key: 'reviews', label: 'Rated 5.0 By Every Customer', startPct: 0.529, endPct: 0.639, benefit: 'Real reviews, front and center. Proof that closes the next job.' },
      { key: 'areas', label: 'Where We Work', startPct: 0.756, endPct: 0.83, benefit: 'A page for each area served, so search puts you on the map.' },
    ],
  },
  {
    slug: 'eastwood', name: 'Eastwood Plumbing & Heating', url: 'https://eastwood-site.vercel.app',
    imgHeight: 30782, kicker: 'Plumbing & HVAC, Gardner MA', 
    showcaseHook: 'A site that looks as good as the work.',
    features: [
      { key: 'services', label: 'A Page Per Service', startPct: 0.152, endPct: 0.259, benefit: 'Every service its own page, so each one can rank.' },
      { key: 'gallery', label: 'Real Photos Of The Work', startPct: 0.457, endPct: 0.582, benefit: 'The work speaks. Real jobs, not stock photos.' },
      { key: 'reviews', label: 'Real Customer Reviews', startPct: 0.694, endPct: 0.799, benefit: 'Proof from real customers, right where it counts.' },
    ],
  },
  {
    slug: 'southern', name: 'Southern Beacon', url: 'https://southern-beacon.vercel.app',
    imgHeight: 29274, kicker: 'Mold & Remediation, Atlanta GA', displayUrl: 'southernbeaconenvironmental.com',
    showcaseHook: 'Built to be found and built to convert.',
    features: [
      { key: 'services', label: 'A Page Per Service', startPct: 0.07, endPct: 0.18, benefit: 'Every service its own page, so each one can rank.' },
      { key: 'gallery', label: 'Real Photos Of The Work', startPct: 0.561, endPct: 0.652, benefit: 'The work speaks. Real jobs, not stock photos.' },
      { key: 'form', label: 'Free Walk-Through Request', startPct: 0.832, endPct: 0.93, benefit: 'Name, phone, zip, service. The lead lands the moment they submit.' },
    ],
  },
  {
    slug: 'globalmax', name: 'Global Max Services', url: 'https://global-max-services.vercel.app',
    imgHeight: 27704, kicker: 'Freight Carrier, Chicago IL', displayUrl: 'globalmaxservices.com',
    showcaseHook: 'A site that works as hard as the crew.',
    features: [
      { key: 'form', label: 'Request A Quote', startPct: 0.823, endPct: 0.93, benefit: 'The form that turns a visitor into a booked job.' },
    ],
  },
  {
    slug: 'deadhead', name: 'Deadhead Trucking', url: 'https://deadhead-trucking.vercel.app',
    imgHeight: 15060, kicker: 'Freight Carrier, Chicago IL',
    showcaseHook: 'A site that keeps the trucks full.',
    features: [
      { key: 'form', label: 'Get In Touch', startPct: 0.692, endPct: 0.8, benefit: 'The form that turns a visitor into a booked lead.' },
    ],
  },
  {
    slug: 'cocina', name: 'La Cocina de Jeannie', url: 'https://la-cocina-de-jeannie.vercel.app',
    imgHeight: 19078, kicker: 'Catering, North Georgia', 
    showcaseHook: 'A menu that makes them hungry.',
    features: [],
  },
  {
    slug: 'gtc', name: 'The GTC Group', url: 'https://gtc-group-website.vercel.app',
    imgHeight: 11616, kicker: 'Logistics Advisory, Nationwide', displayUrl: 'globaltransportconsultinggroup.com',
    showcaseHook: 'A site that closes carrier deals.',
    features: [
      { key: 'services', label: 'What They Actually Do', startPct: 0.157, endPct: 0.282, benefit: 'The service laid out clearly, so a carrier gets it fast.' },
    ],
    stats: [
      { value: '$500M+', label: 'In freight managed. Numbers that build trust on sight.', kicker: 'By the numbers' },
    ],
  },
  {
    slug: 'rsa', name: 'Reliable Solutions Atlanta', url: 'https://reliable-solutions-atlanta.vercel.app',
    imgHeight: 15488, kicker: 'Waterproofing, Atlanta GA', displayUrl: 'waterhelpme.com',
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
    imgHeight: 15148, kicker: 'Abrasive Blasting, Southeast US', displayUrl: 'stricklandsurfacepreparation.com',
    showcaseHook: 'A site that brings the job to the crew.',
    features: [
      { key: 'services', label: 'A Page Per Service', startPct: 0.109, endPct: 0.234, benefit: 'Every service its own page, so each one can rank.' },
      { key: 'gallery', label: 'Real Photos Of The Work', startPct: 0.33, endPct: 0.455, benefit: 'The work speaks. Real jobs, not stock photos.' },
      { key: 'areas', label: 'Every Area You Serve', startPct: 0.805, endPct: 0.872, benefit: 'A page for each town, so search puts you on the map.' },
    ],
  },
];