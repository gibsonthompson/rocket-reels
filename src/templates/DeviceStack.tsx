import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, SAFE, FONT_MIN, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { Background } from '../components/Background';
import { Signature } from '../components/Signature';
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

  // front phone shows the homepage hero (top); back shows a shallow second view.
  // Both stay near the top so the site is recognizable, not deep-page sections.
  const yA = 0.00 * scaledH + drift(frame, 6, 160);
  const yB = 0.14 * scaledH + drift(frame + 40, 6, 160);

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
          <Signature onDark={onDark} displayUrl={spec.site.displayUrl} />
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
        <div style={{ ...entryStyle(enter(frame, fps, outroStart - 20, 'smooth'), 'up', 16) }}>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 46, letterSpacing: '-0.02em', color: text }}>
            {spec.site.name}
          </div>
          {spec.site.displayUrl ? (
            <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 26, color: onDark ? C.onDark2 : C.ink2, marginTop: 6 }}>
              {spec.site.displayUrl}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};