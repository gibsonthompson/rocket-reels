import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { C, SAFE, FONT_MIN, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { Background } from '../components/Background';
import { PhoneFrame } from '../components/PhoneFrame';
import { Kicker } from '../components/Kicker';
import type { ReelSpec } from '../engine/schema';

/**
 * FeatureFocus: one real feature per reel. Crops a vertical band of the site's
 * full.png (startPct..endPct) and shows it in the phone with a mono label and a
 * benefit line. Subject is the real feature, not invented UI.
 */
export const FeatureFocus: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const mode = spec.mode ?? 'dark';
  const onDark = mode === 'dark';
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;
  const f = spec.feature!;

  const phoneW = 560, phoneH = 1120;
  const innerW = phoneW - 36, innerH = phoneH - 36;

  // capture geometry
  const capW = 860;
  const scale = innerW / capW;
  const scaledH = spec.site.imgHeight * scale;
  const bandTop = f.startPct * scaledH;
  const bandBottom = f.endPct * scaledH;
  const bandH = bandBottom - bandTop;

  // gentle pan within the band across the clip (slow, so the feature reads)
  const intro = 54;
  const p = Math.max(0, Math.min(1, (frame - intro) / Math.max(1, durationInFrames - intro - 40)));
  // center the band in the phone, then drift a little to show it's real/scrollable
  const overflow = Math.max(0, bandH - innerH);
  const y = bandTop + lerp(p, [0, Math.min(overflow, 220)]);

  const pIn = enter(frame, fps, intro - 24, 'smooth');
  const phoneRise = lerp(pIn, [160, 0]) + drift(frame, 4, 130);

  return (
    <AbsoluteFill>
      <Background mode={mode} />

      {/* top: kicker + feature label */}
      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top - 60, justifyContent: 'flex-start' }}>
        <div style={entryStyle(enter(frame, fps, 2, 'entrance'), 'up', 18)}>
          <Kicker onDark={onDark}>{spec.kicker}</Kicker>
        </div>
        <div style={{
          fontFamily: F.display, fontWeight: 700, fontSize: 78, lineHeight: 1.02,
          letterSpacing: '-0.03em', color: text, marginTop: 22, maxWidth: '15em',
          ...entryStyle(enter(frame, fps, 8, 'smooth'), 'up', 26),
        }}>
          {f.label}
        </div>
      </AbsoluteFill>

      {/* phone with the cropped feature band */}
      <Sequence from={intro - 24}>
        <AbsoluteFill style={{ opacity: lerp(enter(frame, fps, intro - 24, 'smooth'), [0, 1]) }}>
          <PhoneFrame width={phoneW} height={phoneH} y={phoneRise - 30}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <Img src={staticFile(spec.site.capture)} style={{
                position: 'absolute', top: 0, left: 0, width: innerW,
                transform: `translateY(-${y}px)`,
              }} />
            </div>
          </PhoneFrame>
        </AbsoluteFill>
      </Sequence>

      {/* bottom: the benefit line, over a scrim so it never fights the phone */}
      <AbsoluteFill style={{ justifyContent: 'flex-end' }}>
        <div style={{ height: 520, background: onDark ? 'linear-gradient(transparent, #0E0E10 55%)' : 'linear-gradient(transparent, #F4F3F0 55%)' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: SAFE.sides, paddingBottom: SAFE.bottom - 90 }}>
        <div style={{
          fontFamily: F.display, fontWeight: 600, fontSize: 52, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: text, maxWidth: '16em',
          ...entryStyle(enter(frame, fps, intro + 10, 'smooth'), 'up', 22),
        }}>
          {f.benefit}
        </div>
        <div style={{
          fontFamily: F.mono, fontSize: FONT_MIN.label, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: onDark ? C.redOnDark : C.red, marginTop: 20,
          ...entryStyle(enter(frame, fps, intro + 20, 'smooth'), 'up', 16),
        }}>
          {spec.site.name} · Built by Rocket Solutions
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};