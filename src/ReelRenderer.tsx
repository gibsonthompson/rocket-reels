import React from 'react';
import { Showcase } from './templates/Showcase';
import type { ReelSpec } from './engine/schema';

export const ReelRenderer: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  switch (spec.template) {
    case 'Showcase': return <Showcase spec={spec} />;
    default: {
      const never: never = spec.template as never;
      throw new Error(`Unhandled template: ${String(never)}`);
    }
  }
};
