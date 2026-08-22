// Live-site fonts, loaded via @remotion/google-fonts so renders are deterministic.
import { loadFont as loadInstrument } from '@remotion/google-fonts/InstrumentSans';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

const display = loadInstrument('normal', { weights: ['500', '600', '700'] });
const body = loadInter('normal', { weights: ['400', '500', '600'] });
const mono = loadMono('normal', { weights: ['400', '500'] });

export const F = {
  display: display.fontFamily,
  body: body.fontFamily,
  mono: mono.fontFamily,
} as const;

export const waitForFonts = () =>
  Promise.all([display.waitUntilDone(), body.waitUntilDone(), mono.waitUntilDone()]);
