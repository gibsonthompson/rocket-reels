// Layout math. Every template lays elements into fixed, non-overlapping vertical
// zones computed from the canvas and the real Instagram safe area. Phones are
// PINNED from a fixed top Y (never canvas-centered), so their bottom edge is
// deterministic and the bottom text block always has reserved, clear space.
//
// Rule: phoneTop + phoneH + GAP + bottomBlockH <= USABLE_BOTTOM. Enforced here.

import { CANVAS, SAFE } from '../brand/tokens';

export const USABLE_TOP = SAFE.top;                       // 220
export const USABLE_BOTTOM = CANVAS.height - SAFE.bottom; // 1580
export const GAP = 44;                                    // min gap between zones

// Per-template zone budgets (heights of the top and bottom text blocks).
// Phone height is derived so nothing can overlap.
type Zone = { phoneTop: number; phoneH: number; bottomTop: number };

function zone(topBlockH: number, bottomBlockH: number): Zone {
  const phoneTop = USABLE_TOP + topBlockH + GAP;
  const phoneH = USABLE_BOTTOM - bottomBlockH - GAP - phoneTop;
  const bottomTop = USABLE_BOTTOM - bottomBlockH;
  return { phoneTop, phoneH, bottomTop };
}

// Budgets measured from the actual rendered text sizes in each template.
export const LAYOUT = {
  // kicker(40) + 2-line label(176); bottom: benefit 3 lines(162)+name/url(96)+sig(70)+gaps(52)=380
  feature: zone(216, 380),
  // signature(130); bottom: kicker(38)+name(62)+url(34)+gaps(24)=158 -> round 175
  showcase: zone(130, 175),
  // signature(90)+dots+label(100); bottom: benefit 2 lines(92)+gap=130
  multi: zone(190, 130),
} as const;