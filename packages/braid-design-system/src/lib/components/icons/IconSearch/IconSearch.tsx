import React from 'react';
import { Box } from '../../Box/Box';
import type { UseIconProps } from '../../../hooks/useIcon';
import useIcon from '../../../hooks/useIcon';
import { IconSearchSvg } from './IconSearchSvg';

export type IconSearchProps = UseIconProps;

export const IconSearch = (props: IconSearchProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconSearchSvg} {...iconProps} />;
};
