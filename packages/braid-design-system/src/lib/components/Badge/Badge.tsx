import React, { forwardRef, Children } from 'react';
import assert from 'assert';
import type { BoxProps } from '../Box/Box';
import { Box } from '../Box/Box';
import type { DataAttributeMap } from '../private/buildDataAttributes';
import buildDataAttributes from '../private/buildDataAttributes';
import * as styles from './Badge.css';
import { textStyles } from '../../css/typography';
import { Truncate } from '../private/Truncate/Truncate';

const validTones = [
  'promote',
  'info',
  'neutral',
  'positive',
  'caution',
  'critical',
] as const;
type Tone = (typeof validTones)[number];
type BadgeWeight = 'strong' | 'regular';
export interface BadgeProps {
  tone?: Tone;
  weight?: BadgeWeight;
  bleedY?: boolean;
  title?: string;
  children: string;
  id?: string;
  data?: DataAttributeMap;
  tabIndex?: BoxProps['tabIndex'];
  'aria-describedby'?: string;
}

const lightModeBackgroundForTone = {
  positive: 'positiveLight',
  critical: 'criticalLight',
  info: 'infoLight',
  promote: 'promoteLight',
  neutral: 'neutralLight',
  caution: 'cautionLight',
} as const;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'info',
      weight = 'regular',
      bleedY = false,
      title,
      children,
      id,
      data,
      tabIndex,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    },
    ref,
  ) => {
    assert(
      validTones.indexOf(tone) >= 0,
      `Badge tone of "${tone}" is not valid.`,
    );

    assert(
      Children.toArray(children).every((child) =>
        ['string', 'number'].includes(typeof child),
      ),
      'Badge may only contain strings or numbers',
    );

    return (
      <Box
        component="span"
        display="flex"
        alignItems="center"
        cursor="default"
        className={[bleedY ? styles.bleedY : null]}
        {...buildDataAttributes({ data, validateRestProps: restProps })}
      >
        <Box
          component="span"
          id={id}
          ref={ref}
          tabIndex={tabIndex}
          aria-describedby={ariaDescribedBy}
          title={title ?? (!ariaDescribedBy ? children : undefined)}
          background={
            weight === 'strong' ? tone : lightModeBackgroundForTone[tone]
          }
          paddingX="xsmall"
          paddingY="xxsmall"
          borderRadius="standard"
          overflow="hidden"
          minWidth={0}
          className={textStyles({
            size: styles.constants.textSize,
            baseline: true,
            weight: 'medium',
          })}
        >
          <Truncate>{children}</Truncate>
        </Box>
      </Box>
    );
  },
);

Badge.displayName = 'Badge';
// @ts-expect-error
Badge.__isBadge__ = true;
