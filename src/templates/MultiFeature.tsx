import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { C, SAFE, FONT_MIN } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp, drift } from '../engine/motion';
import { Background } from '../components/Background';
import { PhoneFrame } from '../components/PhoneFrame';
import { Kicker } from '../components/Kicker';
import type { ReelSpec, Band } from '../engine/schema';

/**
 * MultiFeature: fast cuts through 2-3 real feature bands of one site, each with
 * its own label + benefit. One reel that surveys a site's strongest features.
 */
export const MultiFeature: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const onDark = (spec.mode ?? 'dark') === 'dark';
  const text = onDark ? C.onDark : C.ink;
  const bands = spec.features ?? [];
  const n = Math.max(1, bands.length);

  const phoneW = 460, phoneH = 820;
  const innerW = phoneW - 36;
  const capW = 860;
  const scale = innerW / capW;
  const scaledH = spec.site.imgHeight * scale;

  const per = Math.floor(durationInFrames / n);

  return (
    <AbsoluteFill>
      <Background mode={onDark ? 'dark' : 'light'} />

      {/* persistent top rail */}
      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top, justifyContent: 'flex-start' }}>
        <div style={entryStyle(enter(frame, fps, 2, 'entrance'), 'up', 16)}>
          <Kicker onDark={onDark}>{spec.site.name} · Built by Rocket Solutions</Kicker>
        </div>
      </AbsoluteFill>

      {bands.map((b, i) => {
        const localStart = i * per;
        return (
          <Sequence key={i} from={localStart} durationInFrames={per}>
            <MultiSlide band={b} capture={spec.site.capture} innerW={innerW} phoneW={phoneW} phoneH={phoneH}
                        scaledH={scaledH} onDark={onDark} text={text} idx={i} total={n} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const MultiSlide: React.FC<{
  band: Band; capture: string; innerW: number; phoneW: number; phoneH: number;
  scaledH: number; onDark: boolean; text: string; idx: number; total: number;
}> = ({ band, capture, innerW, phoneW, phoneH, scaledH, onDark, text, idx, total }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bandTop = band.startPct * scaledH;
  const p = lerp(Math.min(1, frame / durationInFrames), [0, 1]);
  const overflow = Math.max(0, (band.endPct - band.startPct) * scaledH - (phoneH - 36));
  const y = bandTop + lerp(p, [0, Math.min(overflow, 160)]);

  const inn = enter(frame, fps, 0, 'smooth');
  const out = 1 - lerp((frame - (durationInFrames - 10)) / 10, [0, 1]);

  return (
    <AbsoluteFill style={{ opacity: Math.min(lerp(inn, [0, 1]), out) }}>
      {/* progress dots */}
      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top + 46, justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: total }).map((_, k) => (
            <div key={k} style={{ width: k === idx ? 30 : 12, height: 6, borderRadius: 3,
              background: k === idx ? (onDark ? C.redOnDark : C.red) : (onDark ? C.lineDark : C.line) }} />
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top + 86, justifyContent: 'flex-start' }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 64, lineHeight: 1.03,
          letterSpacing: '-0.03em', color: text, maxWidth: '15em',
          ...entryStyle(enter(frame, fps, 4, 'smooth'), 'up', 22) }}>
          {band.label}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', marginTop: 120 }}>
        <PhoneFrame width={phoneW} height={phoneH} y={-40 + drift(frame, 4, 120)}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <Img src={staticFile(capture)}
                 style={{ position: 'absolute', top: 0, left: 0, width: innerW, transform: `translateY(-${y}px)` }} />
          </div>
        </PhoneFrame>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'flex-end' }}>
        <div style={{ height: 560, background: onDark ? 'linear-gradient(transparent, #0E0E10 60%)' : 'linear-gradient(transparent, #F4F3F0 60%)' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: SAFE.sides, paddingBottom: SAFE.bottom }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 46, lineHeight: 1.12,
          letterSpacing: '-0.02em', color: text, maxWidth: '16em',
          ...entryStyle(enter(frame, fps, 8, 'smooth'), 'up', 18) }}>
          {band.benefit}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};