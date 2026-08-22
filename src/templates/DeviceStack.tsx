import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, SAFE, FONT_MIN, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { Background } from '../components/Background';
import { Kicker } from '../components/Kicker';
import type { ReelSpec } from '../engine/schema';

/**
 * DeviceStack: two site screens float at an angle, slowly drifting, as a
 * portfolio/montage feel. Uses the same site capture at two different scroll
 * offsets so it reads as "a whole site, many screens." Product-style (part of 80%).
 */
export const DeviceStack: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const onDark = (spec.mode ?? 'dark') === 'dark';
  const text = onDark ? C.onDark : C.ink;

  const pw = 360, ph = 720, iw = pw - 32;
  const scale = iw / 860;
  const scaledH = spec.site.imgHeight * scale;

  // two offsets into the page
  const yA = 0.10 * scaledH + drift(frame, 8, 150);
  const yB = 0.42 * scaledH + drift(frame + 40, 8, 150);

  const inA = enter(frame, fps, 6, 'entrance');
  const inB = enter(frame, fps, 16, 'entrance');
  const outroStart = durationInFrames - 54;

  const Screen: React.FC<{ y: number; x: number; rot: number; z: number; p: number }> = ({ y, x, rot, z, p }) => (
    <div style={{ position: 'absolute', left: '50%', top: '50%',
      transform: `translate(-50%,-50%) translate(${x}px, ${lerp(p,[90,0])}px) rotate(${rot}deg) scale(${lerp(p,[0.9,1])})`,
      opacity: lerp(p, [0, 1]), zIndex: z, width: pw, height: ph, marginLeft: -pw/2, marginTop: -ph/2 }}>
      <div style={{ width: pw, height: ph, borderRadius: 40, background: '#0A0A0C', padding: 16,
        boxShadow: '0 50px 100px -25px rgba(0,0,0,0.6)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', background: C.paper, position: 'relative' }}>
          <Img src={staticFile(spec.site.capture)} style={{ position: 'absolute', top: 0, left: 0, width: iw, transform: `translateY(-${y}px)` }} />
        </div>
      </div>
    </div>
  );

  return (
    <AbsoluteFill>
      <Background mode={onDark ? 'dark' : 'light'} />

      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top, justifyContent: 'flex-start' }}>
        <div style={entryStyle(enter(frame, fps, 2, 'entrance'), 'up', 16)}>
          <Kicker onDark={onDark}>Built by Rocket Solutions</Kicker>
        </div>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 72, lineHeight: 1.03,
          letterSpacing: '-0.03em', color: text, marginTop: 20, maxWidth: '14em',
          ...entryStyle(enter(frame, fps, 8, 'smooth'), 'up', 24) }}>
          {spec.hook}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ marginTop: 340 }}>
        <Screen y={yB} x={95} rot={5} z={1} p={inB} />
        <Screen y={yA} x={-95} rot={-5} z={2} p={inA} />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: SAFE.sides, paddingBottom: SAFE.bottom }}>
        <div style={{ fontFamily: F.mono, fontSize: FONT_MIN.label, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: onDark ? C.redOnDark : C.red,
          ...entryStyle(enter(frame, fps, outroStart - 20, 'smooth'), 'up', 16) }}>
          {spec.site.name} · gorocketsolutions.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};