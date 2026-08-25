import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { C, SAFE, FONT_MIN, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { LAYOUT } from '../engine/layout';
import { Background } from '../components/Background';
import { SiteScroll } from '../components/SiteScroll';
import { Signature } from '../components/Signature';
import type { ReelSpec } from '../engine/schema';

export const Showcase: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const mode = spec.mode ?? 'dark';
  const onDark = mode === 'dark';
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;

  const introEnd = 78;
  const outroStart = durationInFrames - 66;

  const Z = LAYOUT.showcase;
  const phoneW = 540;
  const phoneH = Z.phoneH;
  const innerW = phoneW - 36, innerH = phoneH - 36;

  const pIn = enter(frame, fps, introEnd, 'smooth');
  const phoneDrift = lerp(pIn, [60, 0]) + drift(frame, 4, 130);

  return (
    <AbsoluteFill>
      <Background mode={mode} />

      <Sequence from={introEnd}>
        <AbsoluteFill style={{ opacity: lerp(enter(frame, fps, introEnd, 'smooth'), [0, 1]) }}>
          <div style={{
            position: 'absolute', top: Z.phoneTop, left: '50%',
            transform: `translateX(-50%) translateY(${phoneDrift}px)`,
            width: phoneW, height: phoneH,
            borderRadius: 50, background: '#0A0A0C', padding: 18,
            boxShadow: '0 60px 120px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden', background: C.paper, position: 'relative' }}>
              <SiteScroll src={spec.site.capture} frameWidth={innerW} frameHeight={innerH}
                imgHeight={spec.site.imgHeight} hold={12} tail={70} />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top, justifyContent: 'flex-start' }}>
        <div style={entryStyle(enter(frame, fps, 4, 'entrance'), 'up', 20)}>
          <Signature onDark={onDark} size="large" />
        </div>
      </AbsoluteFill>

      <Sequence durationInFrames={introEnd}>
        <AbsoluteFill style={{
          padding: SAFE.sides, justifyContent: 'center',
          opacity: lerp(enter(frame, fps, 0, 'smooth'), [0, 1]) * (1 - lerp((frame - (introEnd - 30)) / 22, [0, 1])),
        }}>
          <h1 style={{
            fontFamily: F.display, fontWeight: 700, fontSize: 96, lineHeight: 1.0,
            letterSpacing: '-0.03em', color: text,
            ...entryStyle(enter(frame, fps, 8, 'smooth'), 'up', 30),
          }}>
            {spec.hook}
          </h1>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={introEnd} durationInFrames={outroStart - introEnd}>
        <AbsoluteFill style={{ justifyContent: 'flex-end' }}>
          <div style={{ height: 520, background: onDark ? 'linear-gradient(transparent, #0E0E10 66%)' : 'linear-gradient(transparent, #F4F3F0 66%)' }} />
        </AbsoluteFill>
        <AbsoluteFill>
          <div style={{ position: 'absolute', top: Z.bottomTop, left: SAFE.sides, right: SAFE.sides,
            ...entryStyle(enter(frame - introEnd, fps, 6, 'entrance'), 'up', 24) }}>
            <div style={{ fontFamily: F.body, fontSize: 30, fontWeight: 500, color: muted, marginBottom: 8 }}>
              {spec.kicker}
            </div>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 62, letterSpacing: '-0.02em', color: text }}>
              {spec.site.name}
            </div>
            {spec.site.displayUrl ? (
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 30, color: muted, marginTop: 8 }}>
                {spec.site.displayUrl}
              </div>
            ) : null}
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={outroStart}>
        <AbsoluteFill style={{
          background: onDark ? C.dark : C.paper,
          justifyContent: 'center', alignItems: 'center', padding: SAFE.sides,
          opacity: lerp(enter(frame - outroStart, fps, 0, 'smooth'), [0, 1]),
        }}>
          <Img src={staticFile(onDark ? LOGO.lockupLight : LOGO.lockupDark)}
               style={{ width: 560, ...entryStyle(enter(frame - outroStart, fps, 4, 'smooth'), 'up', 24) }} />
          <div style={{
            fontFamily: F.display, fontWeight: 600, fontSize: 56, letterSpacing: '-0.02em',
            color: text, textAlign: 'center', marginTop: 44, maxWidth: '15em',
            ...entryStyle(enter(frame - outroStart, fps, 14, 'smooth'), 'up', 22),
          }}>
            {spec.cta}
          </div>
          <div style={{
            fontFamily: F.body, fontWeight: 500, fontSize: 30,
            color: onDark ? C.redOnDark : C.red, marginTop: 30,
            ...entryStyle(enter(frame - outroStart, fps, 22, 'smooth'), 'up', 18),
          }}>
            gorocketsolutions.com
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};