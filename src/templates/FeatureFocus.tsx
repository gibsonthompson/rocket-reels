import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { C, SAFE, FONT_MIN } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { LAYOUT } from '../engine/layout';
import { Background } from '../components/Background';
import { Signature } from '../components/Signature';
import type { ReelSpec } from '../engine/schema';

/**
 * FeatureFocus: one real feature per reel. Zone-based layout (engine/layout.ts):
 * label block top, phone pinned in the middle zone at a height that fits, benefit
 * + business name + client url + signature in the bottom zone. No overlap by math.
 */
export const FeatureFocus: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const mode = spec.mode ?? 'dark';
  const onDark = mode === 'dark';
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;
  const f = spec.feature!;

  const Z = LAYOUT.feature;
  const phoneW = 460;
  const phoneH = Z.phoneH;                 // fits the zone
  const innerW = phoneW - 32;

  const capW = 860;
  const scale = innerW / capW;
  const scaledH = spec.site.imgHeight * scale;
  const bandTop = f.startPct * scaledH;
  const overflow = Math.max(0, (f.endPct - f.startPct) * scaledH - (phoneH - 32));

  const intro = 54;
  const p = Math.max(0, Math.min(1, (frame - intro) / Math.max(1, durationInFrames - intro - 40)));
  const y = bandTop + lerp(p, [0, Math.min(overflow, 200)]);

  const pIn = enter(frame, fps, intro - 24, 'smooth');
  const phoneDrift = lerp(pIn, [50, 0]) + drift(frame, 4, 130);

  return (
    <AbsoluteFill>
      <Background mode={mode} />

      {/* TOP: kicker + label */}
      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top, justifyContent: 'flex-start' }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 30, letterSpacing: '-0.01em',
          color: onDark ? C.redOnDark : C.red, ...entryStyle(enter(frame, fps, 2, 'entrance'), 'up', 18) }}>
          {spec.kicker}
        </div>
        <div style={{
          fontFamily: F.display, fontWeight: 700, fontSize: 76, lineHeight: 1.03,
          letterSpacing: '-0.03em', color: text, marginTop: 20, maxWidth: '15em',
          ...entryStyle(enter(frame, fps, 8, 'smooth'), 'up', 26),
        }}>
          {f.label}
        </div>
      </AbsoluteFill>

      {/* PHONE, pinned at Z.phoneTop */}
      <Sequence from={intro - 24}>
        <AbsoluteFill style={{ opacity: lerp(enter(frame, fps, intro - 24, 'smooth'), [0, 1]) }}>
          <div style={{
            position: 'absolute', top: Z.phoneTop, left: '50%',
            transform: `translateX(-50%) translateY(${phoneDrift}px)`,
            width: phoneW, height: phoneH,
            borderRadius: 44, background: '#0A0A0C', padding: 16,
            boxShadow: '0 50px 100px -25px rgba(0,0,0,0.6)',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 30, overflow: 'hidden', background: C.paper, position: 'relative' }}>
              <Img src={staticFile(spec.site.capture)} style={{
                position: 'absolute', top: 0, left: 0, width: innerW, transform: `translateY(-${y}px)` }} />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* BOTTOM: benefit + business name/url + signature, pinned at Z.bottomTop */}
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: Z.bottomTop, left: SAFE.sides, right: SAFE.sides }}>
          <div style={{
            fontFamily: F.display, fontWeight: 600, fontSize: 48, lineHeight: 1.12,
            letterSpacing: '-0.02em', color: text, maxWidth: '16em',
            ...entryStyle(enter(frame, fps, intro + 10, 'smooth'), 'up', 22),
          }}>
            {f.benefit}
          </div>
          <div style={{ marginTop: 24, ...entryStyle(enter(frame, fps, intro + 16, 'smooth'), 'up', 18) }}>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 38, letterSpacing: '-0.02em', color: text }}>
              {spec.site.name}
            </div>
            {spec.site.displayUrl ? (
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 26, color: muted }}>
                {spec.site.displayUrl}
              </div>
            ) : null}
          </div>
          <div style={{ marginTop: 24, ...entryStyle(enter(frame, fps, intro + 22, 'smooth'), 'up', 16) }}>
            <Signature onDark={onDark} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};