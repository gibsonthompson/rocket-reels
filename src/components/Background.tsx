import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C } from '../brand/tokens';

/** Dark editorial background with a faint red glow. No gradients on light mode. */
export const Background: React.FC<{ mode: 'dark' | 'light' }> = ({ mode }) => {
  if (mode === 'light') return <AbsoluteFill style={{ background: C.paper }} />;
  return (
    <AbsoluteFill style={{ background: C.dark, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', width: 1200, height: 1200, left: -200, top: 500,
        borderRadius: '50%', background: `radial-gradient(circle, ${C.red} 0%, transparent 65%)`,
        opacity: 0.12, filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', width: 900, height: 900, right: -150, top: -100,
        borderRadius: '50%', background: `radial-gradient(circle, ${C.red} 0%, transparent 65%)`,
        opacity: 0.08, filter: 'blur(70px)',
      }} />
    </AbsoluteFill>
  );
};
