import React from 'react';
import { Box } from '../../Box/Box';
import type { UseIconProps } from '../../../hooks/useIcon';
import useIcon from '../../../hooks/useIcon';
import { IconLinkBrokenSvg } from './IconLinkBrokenSvg';

export type IconLinkBrokenProps = UseIconProps;

export const IconLinkBroken = (props: IconLinkBrokenProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconLinkBrokenSvg} {...iconProps} />;
};
