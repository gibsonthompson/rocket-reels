import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C } from '../brand/tokens';

/**
 * A device frame that holds a scrolling site capture. The frame is subtle so
 * the real site is the subject, not the chrome.
 */
export const PhoneFrame: React.FC<{
  width: number;
  height: number;
  children: React.ReactNode;
  x?: number;
  y?: number;
  rotate?: number;
}> = ({ width, height, children, x = 0, y = 0, rotate = 0 }) => {
  const bezel = 18;
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width, height,
          transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
          borderRadius: 54,
          background: '#0A0A0C',
          padding: bezel,
          boxShadow: '0 60px 120px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <div
          style={{
            width: '100%', height: '100%',
            borderRadius: 40, overflow: 'hidden',
            background: C.paper, position: 'relative',
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
