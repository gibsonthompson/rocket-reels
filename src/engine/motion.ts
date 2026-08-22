import { interpolate, spring } from 'remotion';

export const springs = {
  snappy:   { damping: 200 },
  smooth:   { damping: 30, stiffness: 120, mass: 1 },
  entrance: { damping: 18, stiffness: 90,  mass: 1 },
  elegant:  { damping: 26, stiffness: 60,  mass: 1 },
} as const;
export type SpringName = keyof typeof springs;

export const enter = (frame: number, fps: number, delay = 0, preset: SpringName = 'entrance') =>
  spring({ frame: frame - delay, fps, config: springs[preset] });

export const lerp = (p: number, out: [number, number]) =>
  interpolate(p, [0, 1], out, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

export type Dir = 'up' | 'down' | 'left' | 'right' | 'scale';
export const entryStyle = (p: number, dir: Dir = 'up', dist = 40): React.CSSProperties => {
  const d = lerp(p, [dist, 0]);
  const map: Record<Dir, string> = {
    up: `translateY(${d}px)`, down: `translateY(${-d}px)`,
    left: `translateX(${d}px)`, right: `translateX(${-d}px)`,
    scale: `scale(${lerp(p, [0.92, 1])})`,
  };
  return { opacity: lerp(p, [0, 1]), transform: map[dir] };
};

// continuous life: gentle drift for held elements
export const drift = (frame: number, amp = 6, period = 90) =>
  Math.sin((frame / period) * Math.PI * 2) * amp;
