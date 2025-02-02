import React from 'react';
import { cleanSpaceValue } from '../../playroom/cleanSpaceValue';
import type { TilesProps } from './Tiles';
import { Tiles as BraidTiles } from './Tiles';

export const Tiles = ({ space, columns, ...restProps }: TilesProps) => (
  <BraidTiles
    space={cleanSpaceValue(space)}
    columns={typeof columns === 'boolean' || !columns ? 1 : columns}
    {...restProps}
  />
);
