import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { C, SAFE, FONT_MIN, LOGO, CANVAS } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { Background } from '../components/Background';
import { PhoneFrame } from '../components/PhoneFrame';
import { SiteScroll } from '../components/SiteScroll';
import { Signature } from '../components/Signature';
import type { ReelSpec } from '../engine/schema';

/**
 * Showcase: a real client site scrolling in a phone frame is the subject.
 * Intro card -> phone rises and scrolls the site -> outro CTA card.
 */
export const Showcase: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const mode = spec.mode ?? 'dark';
  const onDark = mode === 'dark';
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;

  const introEnd = 78;    // ~2.6s intro, headline fully clears before phone
  const outroStart = durationInFrames - 66;

  // phone geometry
  const phoneW = 560, phoneH = 1120;
  const innerW = phoneW - 36, innerH = phoneH - 36;

  // phone entrance during intro, hold during scroll, settles
  const pIn = enter(frame, fps, introEnd, 'smooth');
  const phoneY = lerp(pIn, [220, 0]) + drift(frame, 5, 120);

  return (
    <AbsoluteFill>
      <Background mode={mode} />

      {/* PHONE with scrolling site, present after intro */}
      <Sequence from={introEnd}>
        <AbsoluteFill style={{ opacity: lerp(enter(frame, fps, introEnd, 'smooth'), [0, 1]) }}>
          <PhoneFrame width={phoneW} height={phoneH} y={phoneY - 120}>
            <SiteScroll
              src={spec.site.capture}
              frameWidth={innerW}
              frameHeight={innerH}
              imgHeight={spec.site.imgHeight}
              hold={12}
              tail={70}
            />
          </PhoneFrame>
        </AbsoluteFill>
      </Sequence>

      {/* top signature, persistent */}
      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top, justifyContent: 'flex-start' }}>
        <div style={entryStyle(enter(frame, fps, 4, 'entrance'), 'up', 20)}>
          <Signature onDark={onDark} displayUrl={spec.site.displayUrl} />
        </div>
      </AbsoluteFill>

      {/* INTRO headline, fades before phone dominates */}
      <Sequence durationInFrames={introEnd}>
        <AbsoluteFill style={{
          padding: SAFE.sides, paddingLeft: SAFE.sides + 6, paddingRight: SAFE.sides + 6, justifyContent: 'center',
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

      {/* bottom name plate during scroll, over a scrim so it never fights the phone */}
      <Sequence from={introEnd} durationInFrames={outroStart - introEnd}>
        <AbsoluteFill style={{ justifyContent: 'flex-end' }}>
          <div style={{ height: 560, background: onDark ? 'linear-gradient(transparent, #0E0E10 62%)' : 'linear-gradient(transparent, #F4F3F0 62%)' }} />
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: 'flex-end', padding: SAFE.sides, paddingBottom: SAFE.bottom }}>
          <div style={{ ...entryStyle(enter(frame - introEnd, fps, 6, 'entrance'), 'up', 24) }}>
            <div style={{ fontFamily: F.body, fontSize: 30, fontWeight: 500, color: muted, marginBottom: 8 }}>
              {spec.kicker}
            </div>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 62, letterSpacing: '-0.02em', color: text }}>
              {spec.site.name}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* OUTRO CTA */}
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
            fontFamily: F.mono, fontSize: FONT_MIN.label, letterSpacing: '0.1em', textTransform: 'uppercase',
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