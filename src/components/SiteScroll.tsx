import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { lerp } from '../engine/motion';

/**
 * Scrolls a tall full-page capture upward inside its container.
 * Captures are 860px wide (430 * deviceScaleFactor 2). We scale to frameWidth,
 * compute the scaled image height from the known aspect ratio, and translate by
 * real pixels so the scroll always ends exactly at the bottom of the page.
 */
export const SiteScroll: React.FC<{
  src: string;
  frameWidth: number;
  frameHeight: number;
  imgHeight: number;   // natural pixel height of the capture (from capture step)
  hold?: number;       // frames held at top before scrolling
  tail?: number;       // frames held at bottom after scrolling
}> = ({ src, frameWidth, frameHeight, imgHeight, hold = 14, tail = 10 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const capW = 860;
  const scale = frameWidth / capW;
  const scaledH = imgHeight * scale;
  const maxScroll = Math.max(0, scaledH - frameHeight);

  const scrollFrames = durationInFrames - hold - tail;
  const p = Math.max(0, Math.min(1, (frame - hold) / Math.max(1, scrollFrames)));
  const y = lerp(p, [0, maxScroll]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: frameWidth, transform: `translateY(-${y}px)`,
        }}
      />
    </div>
  );
};
