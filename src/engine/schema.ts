export type CopyBackend = 'pools' | 'ai';

export type TemplateId = 'Showcase' | 'FeatureFocus' | 'MultiFeature' | 'DeviceStack' | 'QuoteReveal' | 'StatLine';

export type SiteRef = {
  name: string;
  capture: string;     // 'captures/<slug>/full.png'
  imgHeight: number;   // natural px height of the capture
  url?: string;
  displayUrl?: string; // real domain to show on screen; omit for vercel-only
};

export type Band = {
  label: string;
  startPct: number;
  endPct: number;
  benefit: string;
};

export type ReelSpec = {
  id: string;
  template: TemplateId;
  site: SiteRef;
  hook: string;
  kicker: string;
  cta: string;
  durationInFrames: number;
  mode?: 'dark' | 'light';

  // FeatureFocus: a single band
  feature?: Band;

  // MultiFeature: 2-3 bands shown in sequence
  features?: Band[];

  // QuoteReveal: a testimonial / line as kinetic text
  quote?: { text: string; attribution: string };

  // StatLine: one bold claim
  stat?: { value: string; label: string };
};