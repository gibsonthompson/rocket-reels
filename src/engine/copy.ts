// Copy engine. Produces the variable text for a reel (hook, kicker, benefit, cta).
//
// Two backends behind one interface:
//   - 'pools' (default): deterministic, offline, free. Picks from large phrasing
//     pools using the batch seed, so the same seed reproduces the same words and
//     a new seed yields a fresh set.
//   - 'ai': placeholder seam. Swap in a Claude API call at build time for infinite
//     non-repeating copy. Same signature, so flipping COPY_BACKEND is the only change.
//
// The pools are intentionally large and varied so text is never the thing that
// gives away that two reels share a visual.

import type { CopyBackend } from './schema';
import { pick } from './rng';

type Ctx = {
  rng: () => number;
  siteName: string;
  kicker: string;           // the site's category label, e.g. "Junk Removal, Metro Atlanta"
  featureLabel?: string;    // for feature reels
  featureBenefit?: string;  // the site-specific benefit already written in sites.ts
};

// ---- POOLS ---------------------------------------------------------------

const SHOWCASE_HOOKS = [
  'A site that turns visitors into booked jobs.',
  'Built to book the job, not just sit there.',
  'The website doing the selling while you work.',
  'A site as good as the work behind it.',
  'Where a scroll becomes a scheduled job.',
  'Made to be found, built to convert.',
  'A homepage that earns the phone call.',
  'The kind of site that closes on its own.',
  'Fast, findable, and built to book.',
  'A site customers actually trust on sight.',
  'Designed to turn a search into a sale.',
  'The first impression that wins the job.',
];

const SHOWCASE_CTAS = [
  'We build sites like this.',
  'This is what we build.',
  'Sites like this, built by us.',
  'Your site could work this hard.',
  'We build the site that books the job.',
  'Ready for one of your own?',
  'This could be your business.',
  'Let us build yours.',
];

const DEVICESTACK_HOOKS = [
  'Built to be seen on a phone.',
  'Every screen, made for the thumb.',
  'Looks right on the device that matters.',
  'Mobile-first, because your customers are.',
  'Designed where your customers actually look.',
  'A site that shines on a phone.',
  'Built for the screen in their pocket.',
];

const FEATURE_KICKERS = [
  'The Feature That Wins Jobs',
  'Why This Site Books More',
  'The Part That Converts',
  'Built To Get The Call',
  'The Detail That Closes',
  'What Turns A Visit Into A Job',
  'The Feature Owners Ask For',
];

const MULTI_KICKERS = [
  'A Few Reasons It Works',
  'What Makes This Site Book',
  'Three Things Done Right',
  'Why It Converts',
  'The Parts That Matter',
];

// generic benefit fallbacks (used only if a feature has no site-specific benefit)
const GENERIC_BENEFITS: Record<string, string[]> = {
  form: [
    'The form that turns a visitor into a booked job.',
    'One short form, and the lead is yours.',
    'Fill it out, and the job is on the calendar.',
    'The lead lands the moment they hit send.',
  ],
  reviews: [
    'Proof from real customers, right where it counts.',
    'Real names, real jobs, real trust.',
    'Reviews that close the next customer.',
    'Social proof doing the convincing for you.',
  ],
  areas: [
    'A page for each town, so search puts you on the map.',
    'Found in every area you actually serve.',
    'Local pages that rank where the work is.',
    'Show up when someone nearby is ready to hire.',
  ],
  gallery: [
    'The work speaks. Real jobs, not stock photos.',
    'Proof of the work, right on the page.',
    'Real projects that sell the next one.',
    'Photos that do the closing for you.',
  ],
  services: [
    'Every service its own page, so each one can rank.',
    'A clear page per service, built to be found.',
    'Each service laid out so customers get it fast.',
    'Services split out so search rewards each one.',
  ],
};

// ---- BACKENDS ------------------------------------------------------------

function poolsCopy(ctx: Ctx) {
  return {
    showcaseHook: pick(ctx.rng, SHOWCASE_HOOKS),
    showcaseCta: pick(ctx.rng, SHOWCASE_CTAS),
    deviceStackHook: pick(ctx.rng, DEVICESTACK_HOOKS),
    featureKicker: pick(ctx.rng, FEATURE_KICKERS),
    multiKicker: pick(ctx.rng, MULTI_KICKERS),
    // prefer the site-specific benefit written in sites.ts; vary only if absent
    featureBenefit: (label: string, key: string, siteBenefit?: string) =>
      siteBenefit && siteBenefit.length
        ? siteBenefit
        : pick(ctx.rng, GENERIC_BENEFITS[key] ?? ['Built to book the job.']),
  };
}

// Placeholder for the AI backend. When ready, replace the body with a Claude API
// call that returns the same shape. Keeping the signature identical means the
// generator does not change. See WORKFLOW.md.
function aiCopy(ctx: Ctx) {
  // For now, fall back to pools so the project always renders offline.
  return poolsCopy(ctx);
}

export const COPY_BACKEND: CopyBackend = 'pools'; // flip to 'ai' when wired

export function getCopy(backend: CopyBackend, ctx: Ctx) {
  return backend === 'ai' ? aiCopy(ctx) : poolsCopy(ctx);
}