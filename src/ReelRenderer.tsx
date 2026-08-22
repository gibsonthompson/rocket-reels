import React from 'react';
import { Showcase } from './templates/Showcase';
import { FeatureFocus } from './templates/FeatureFocus';
import type { ReelSpec } from './engine/schema';

export const ReelRenderer: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  switch (spec.template) {
    case 'Showcase': return <Showcase spec={spec} />;
    case 'FeatureFocus': return <FeatureFocus spec={spec} />;
    case 'BeforeAfter': throw new Error('BeforeAfter not built yet');
    default: {
      const never: never = spec.template;
      throw new Error(`Unhandled template: ${String(never)}`);
    }
  }
};