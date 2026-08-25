import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, SAFE, FONT_MIN, LOGO } from '../brand/tokens';
import { F } from '../brand/fonts';
import { enter, entryStyle, lerp } from '../engine/motion';
import { Background } from '../components/Background';
import type { ReelSpec } from '../engine/schema';

/**
 * QuoteReveal: kinetic type. A testimonial or a sharp line, revealed word-group
 * by word-group. The 20% text reel. No product UI, pure type on the brand.
 */
export const QuoteReveal: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const onDark = (spec.mode ?? 'dark') === 'dark';
  const text = onDark ? C.onDark : C.ink;
  const muted = onDark ? C.onDark2 : C.ink2;
  const q = spec.quote ?? { text: '', attribution: '' };

  // reveal words in groups
  const words = q.text.split(' ');
  const revealStart = 24;
  const perWord = 3;

  const outroStart = durationInFrames - 54;

  return (
    <AbsoluteFill>
      <Background mode={onDark ? 'dark' : 'light'} />

      {/* big opening quote mark */}
      <AbsoluteFill style={{ padding: SAFE.sides, paddingTop: SAFE.top - 10, justifyContent: 'flex-start' }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 220, lineHeight: 0.7,
          color: onDark ? C.redOnDark : C.red, ...entryStyle(enter(frame, fps, 0, 'smooth'), 'scale') }}>
          &ldquo;
        </div>
      </AbsoluteFill>

      {/* the quote, word-group reveal */}
      <AbsoluteFill style={{ padding: SAFE.sides, justifyContent: 'center' }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 76, lineHeight: 1.14,
          letterSpacing: '-0.02em', color: text, maxWidth: '13em' }}>
          {words.map((w, i) => {
            const wp = enter(frame, fps, revealStart + i * perWord, 'smooth');
            return (
              <span key={i} style={{ opacity: lerp(wp, [0, 1]),
                display: 'inline-block', marginRight: '0.28em',
                transform: `translateY(${lerp(wp, [14, 0])}px)` }}>
                {w}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* attribution + logo, enters late */}
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: SAFE.sides, paddingBottom: SAFE.bottom }}>
        <div style={{ ...entryStyle(enter(frame, fps, outroStart - 20, 'smooth'), 'up', 18) }}>
          <div style={{ width: 60, height: 4, background: onDark ? C.redOnDark : C.red, marginBottom: 20 }} />
          <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 28,
            color: muted, marginBottom: 26 }}>
            {q.attribution}
          </div>
          <Img src={staticFile(onDark ? LOGO.lockupLight : LOGO.lockupDark)} style={{ width: 380 }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};