import React from 'react';
import type { MenuItemProps } from './MenuItem';
import { MenuItem as BraidMenuItem } from './MenuItem';

export const MenuItem = ({ badge, ...restProps }: MenuItemProps) => (
  <BraidMenuItem
    badge={typeof badge === 'boolean' ? undefined : badge}
    {...restProps}
  />
);
MenuItem.__isMenuItem__ = true;
