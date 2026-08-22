import React from 'react';
import { Composition } from 'remotion';
import { REELS } from './specs/reels';
import { ReelRenderer } from './ReelRenderer';
import { CANVAS } from './brand/tokens';

export const RemotionRoot: React.FC = () => (
  <>
    {REELS.map((spec) => (
      <Composition
        key={spec.id}
        id={spec.id}
        component={ReelRenderer as React.FC<Record<string, unknown>>}
        durationInFrames={spec.durationInFrames}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
        defaultProps={{ spec } as unknown as Record<string, unknown>}
      />
    ))}
  </>
);
