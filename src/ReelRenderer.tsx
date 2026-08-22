import React from 'react';
import { Showcase } from './templates/Showcase';
import { FeatureFocus } from './templates/FeatureFocus';
import { MultiFeature } from './templates/MultiFeature';
import { DeviceStack } from './templates/DeviceStack';
import { QuoteReveal } from './templates/QuoteReveal';
import { StatLine } from './templates/StatLine';
import type { ReelSpec } from './engine/schema';

export const ReelRenderer: React.FC<{ spec: ReelSpec }> = ({ spec }) => {
  switch (spec.template) {
    case 'Showcase':     return <Showcase spec={spec} />;
    case 'FeatureFocus': return <FeatureFocus spec={spec} />;
    case 'MultiFeature': return <MultiFeature spec={spec} />;
    case 'DeviceStack':  return <DeviceStack spec={spec} />;
    case 'QuoteReveal':  return <QuoteReveal spec={spec} />;
    case 'StatLine':     return <StatLine spec={spec} />;
    default: {
      const never: never = spec.template;
      throw new Error(`Unhandled template: ${String(never)}`);
    }
  }
};