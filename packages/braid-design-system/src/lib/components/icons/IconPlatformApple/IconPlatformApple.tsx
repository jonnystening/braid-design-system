import React from 'react';
import { Box } from '../../Box/Box';
import type { UseIconProps } from '../../../hooks/useIcon';
import useIcon from '../../../hooks/useIcon';
import { IconPlatformAppleSvg } from './IconPlatformAppleSvg';

export type IconPlatformAppleProps = UseIconProps;

export const IconPlatformApple = (props: IconPlatformAppleProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconPlatformAppleSvg} {...iconProps} />;
};
