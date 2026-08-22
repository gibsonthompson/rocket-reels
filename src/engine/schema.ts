export type TemplateId = 'Showcase' | 'FeatureFocus' | 'BeforeAfter';

export type ReelSpec = {
  id: string;
  template: TemplateId;
  site: {
    name: string;          // business name shown on screen
    capture: string;       // 'captures/haulitall/full.png'
    imgHeight: number;     // natural px height of the capture
    url?: string;
  };
  hook: string;            // one line over/under the phone
  kicker: string;          // mono label
  cta: string;             // closing line
  durationInFrames: number;
  mode?: 'dark' | 'light';
};
