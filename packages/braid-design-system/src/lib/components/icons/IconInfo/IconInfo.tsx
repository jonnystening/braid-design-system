import React from 'react';
import { Box } from '../../Box/Box';
import type { UseIconProps } from '../../../hooks/useIcon';
import useIcon from '../../../hooks/useIcon';
import { IconInfoSvg } from './IconInfoSvg';

export type IconInfoProps = UseIconProps;

export const IconInfo = (props: IconInfoProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconInfoSvg} {...iconProps} />;
};
