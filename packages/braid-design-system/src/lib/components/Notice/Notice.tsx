import type { ReactNode } from 'react';
import React from 'react';
import { IconInfo, IconCritical, IconPositive, IconPromote } from '../icons';
import { Columns } from '../Columns/Columns';
import { Column } from '../Column/Column';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { DefaultTextPropsProvider } from '../private/defaultTextProps';
import type { DataAttributeMap } from '../private/buildDataAttributes';
import buildDataAttributes from '../private/buildDataAttributes';

type Tone = 'promote' | 'info' | 'positive' | 'critical';

export type NoticeProps = {
  tone?: Tone;
  data?: DataAttributeMap;
  children: ReactNode;
};

const icons = {
  positive: IconPositive,
  info: IconInfo,
  promote: IconPromote,
  critical: IconCritical,
};

export const Notice = ({
  tone = 'info',
  data,
  children,
  ...restProps
}: NoticeProps) => {
  const Icon = icons[tone];

  return (
    <Box
      role="alert"
      aria-live="polite"
      {...buildDataAttributes({ data, validateRestProps: restProps })}
    >
      <DefaultTextPropsProvider tone={tone}>
        <Columns space="xsmall">
          <Column width="content">
            <Text>
              <Icon />
            </Text>
          </Column>
          <Column>{children}</Column>
        </Columns>
      </DefaultTextPropsProvider>
    </Box>
  );
};
