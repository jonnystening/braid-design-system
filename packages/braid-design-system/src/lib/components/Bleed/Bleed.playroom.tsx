import React from 'react';
import type { BleedProps } from './Bleed';
import { Bleed as BraidBleed, validBleedComponents } from './Bleed';

export const Bleed = ({ component, ...restProps }: BleedProps) => (
  <BraidBleed
    component={
      component && validBleedComponents.indexOf(component) > -1
        ? component
        : undefined
    }
    {...restProps}
  />
);
