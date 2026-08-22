export type TemplateId = 'Showcase' | 'FeatureFocus' | 'BeforeAfter';

export type SiteRef = {
  name: string;
  capture: string;     // 'captures/<slug>/full.png'
  imgHeight: number;   // natural px height of the capture (see height.txt)
  url?: string;
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
  // FeatureFocus only: which vertical band of full.png to feature, 0..1
  feature?: {
    label: string;    // mono label shown, e.g. "Instant Quote Form"
    startPct: number; // top of the band as fraction of full height
    endPct: number;   // bottom of the band
    benefit: string;  // the value line, e.g. "Every lead texts you instantly."
  };
};