import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, SAFE, FONT_MIN, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { Background } from '../components/Background';
import type { ReelSpec } from '../engine/schema';

/**
 * StatLine: one bold claim, animated. The other 20% text reel. A single number
 * or statement that slams in. Use only for claims that are true and defensible.
 */
export const StatLine: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const onDark = (spec.mode ?? 'dark') === 'dark';
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;
  const stat = spec.stat ?? { value: '', label: '' };

  const slam = enter(frame, fps, 18, 'snappy');
  const outroStart = durationInFrames - 48;

  return (
    <AbsoluteFill>
      <Background mode={onDark ? 'dark' : 'light'} />

      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top, justifyContent: 'flex-start' }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 30, letterSpacing: '-0.01em',
          color: onDark ? C.redOnDark : C.red, ...entryStyle(enter(frame, fps, 2, 'entrance'), 'up', 16) }}>
          {spec.kicker}
        </div>
      </AbsoluteFill>

      {/* the stat */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'flex-start', padding: SAFE.sides }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: stat.value.length > 3 ? 200 : 300, lineHeight: 0.9,
          letterSpacing: '-0.04em', color: onDark ? C.redOnDark : C.red,
          opacity: lerp(slam, [0, 1]), transform: `scale(${lerp(slam, [0.8, 1])})`, transformOrigin: 'left center' }}>
          {stat.value}
        </div>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 64, lineHeight: 1.08,
          letterSpacing: '-0.02em', color: text, maxWidth: '13em', marginTop: 20,
          ...entryStyle(enter(frame, fps, 30, 'smooth'), 'up', 24) }}>
          {stat.label}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: SAFE.sides, paddingBottom: SAFE.bottom }}>
        <div style={{ ...entryStyle(enter(frame, fps, outroStart - 20, 'smooth'), 'up', 18) }}>
          <Img src={staticFile(onDark ? LOGO.lockupLight : LOGO.lockupDark)} style={{ width: 360 }} />
          {spec.site.displayUrl ? (
            <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 24, color: onDark ? C.onDark2 : C.ink2, marginTop: 14 }}>
              {spec.site.displayUrl}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};