import React from 'react';
import { F, } from '../brand/fonts';
import { C, FONT_MIN } from '../brand/tokens';

export const Kicker: React.FC<{ children: React.ReactNode; onDark?: boolean }> = ({ children, onDark }) => (
  <div style={{
    fontFamily: F.mono, fontSize: FONT_MIN.label, fontWeight: 500,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: onDark ? C.onDark2 : C.ink3, display: 'flex', alignItems: 'center', gap: 14,
  }}>
    <span style={{ width: 12, height: 12, background: onDark ? C.redOnDark : C.red, display: 'inline-block', flexShrink: 0 }} />
    {children}
  </div>
);
