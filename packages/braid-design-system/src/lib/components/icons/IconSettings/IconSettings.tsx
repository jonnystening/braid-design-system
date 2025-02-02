import React from 'react';
import { Box } from '../../Box/Box';
import type { UseIconProps } from '../../../hooks/useIcon';
import useIcon from '../../../hooks/useIcon';
import { IconSettingsSvg } from './IconSettingsSvg';

export type IconSettingsProps = UseIconProps;

export const IconSettings = (props: IconSettingsProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconSettingsSvg} {...iconProps} />;
};
