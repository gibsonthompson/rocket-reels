import React from 'react';
import { Img, staticFile } from 'remotion';
import { C, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';

/**
 * Rocket Solutions credit line: the icon + "Rocket Solutions" + gorocketsolutions.com.
 * This ALWAYS shows Rocket's own domain, never the client's. The client's domain
 * goes under the business name on the reel (see the name plate in each template).
 */
export const Signature: React.FC<{
  onDark?: boolean;
  align?: 'left' | 'center';
  size?: 'normal' | 'large';
}> = ({ onDark = true, align = 'left', size = 'normal' }) => {
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;
  const icon = size === 'large' ? 76 : 60;
  const name = size === 'large' ? 46 : 38;
  const url = size === 'large' ? 32 : 27;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20,
      justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
      <Img src={staticFile(LOGO.icon)} style={{ height: icon, width: 'auto' }} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.06 }}>
        <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: name, letterSpacing: '-0.015em', color: text }}>
          Rocket Solutions
        </span>
        <span style={{ fontFamily: F.body, fontWeight: 500, fontSize: url, color: muted }}>
          gorocketsolutions.com
        </span>
      </div>
    </div>
  );
};