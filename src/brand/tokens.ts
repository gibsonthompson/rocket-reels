// Rocket Solutions brand. Source of truth: the live site styles.css.
// Red is #EE0A32 (NOT #FC0C36). Fonts are Instrument Sans / Inter / JetBrains Mono.

export const C = {
  paper:   '#F4F3F0',
  paper2:  '#EBE9E4',
  panel:   '#FFFFFF',
  ink:     '#111113',
  ink2:    '#55555C',
  ink3:    '#8B8B93',
  line:    '#DEDBD4',
  dark:    '#0E0E10',
  dark2:   '#17171A',
  onDark:  '#EDEBE6',
  onDark2: '#93939B',
  lineDark:'#2A2A2E',
  red:     '#EE0A32',
  redDeep: '#B80825',
  // red brightened slightly for legibility on the dark surface only
  redOnDark: '#FF2A4D',
} as const;

export const CANVAS = { width: 1080, height: 1920, fps: 30 } as const;
// Instagram Reels safe zones: top ~220 (avatar/name), bottom ~320 (caption,
// audio, action rail), sides ~90 (right action buttons). Keep all content inside.
export const SAFE = { top: 220, bottom: 340, sides: 90 } as const;
export const FONT_MIN = { headline: 56, body: 34, label: 28 } as const;

export const LOGO = {
  lockupDark:  'brand/rocket-solutions-lockup.png',        // dark text, for light bg
  lockupLight: 'brand/rocket-solutions-lockup-invert.png', // light text, for dark bg
  icon:        'brand/rocket-solutions-icon.png',
} as const;