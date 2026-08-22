import React from 'react';
import { Img, staticFile } from 'remotion';
import { C, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';

/**
 * A natural credit line: the small Rocket icon + "Rocket Solutions", optionally
 * the site's real domain. Reads like a signature/credit, not a tracked-out
 * mono kicker (which looked templated). Use at top or bottom of a reel.
 */
export const Signature: React.FC<{
  onDark?: boolean;
  displayUrl?: string;
  align?: 'left' | 'center';
}> = ({ onDark = true, displayUrl, align = 'left' }) => {
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14,
      justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <Img src={staticFile(LOGO.icon)} style={{ height: 40, width: 'auto' }} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 30, letterSpacing: '-0.01em', color: text }}>
          Rocket Solutions
        </span>
        {displayUrl ? (
          <span style={{ fontFamily: F.body, fontWeight: 500, fontSize: 24, color: muted }}>
            {displayUrl}
          </span>
        ) : null}
      </div>
    </div>
  );
};