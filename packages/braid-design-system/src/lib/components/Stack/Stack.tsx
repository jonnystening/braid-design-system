import type { ReactNode } from 'react';
import React, { Children } from 'react';
import flattenChildren from '../../utils/flattenChildren';
import assert from 'assert';
import { Box } from '../Box/Box';
import type { ResponsiveSpace } from '../../css/atoms/atoms';
import type { DividerProps } from '../Divider/Divider';
import { Divider } from '../Divider/Divider';
import type { HiddenProps } from '../Hidden/Hidden';
import { Hidden } from '../Hidden/Hidden';
import * as hiddenStyles from '../Hidden/Hidden.css';
import type { Align } from '../../utils/align';
import { alignToFlexAlign } from '../../utils/align';
import { resolveResponsiveRangeProps } from '../../utils/resolveResponsiveRangeProps';
import { optimizeResponsiveArray } from '../../utils/optimizeResponsiveArray';
import { negativeMargin } from '../../css/negativeMargin/negativeMargin';
import type { ReactNodeNoStrings } from '../private/ReactNodeNoStrings';
import type { OptionalResponsiveValue } from '../../css/atoms/sprinkles.css';
import {
  mapResponsiveValue,
  normalizeResponsiveValue,
} from '../../css/atoms/sprinkles.css';
import type { DataAttributeMap } from '../private/buildDataAttributes';
import buildDataAttributes from '../private/buildDataAttributes';

const alignToDisplay = {
  left: 'block',
  center: 'flex',
  right: 'flex',
} as const;

export const validStackComponents = ['div', 'span', 'ol', 'ul'] as const;

interface UseStackItemProps {
  align: OptionalResponsiveValue<Align>;
  space: ResponsiveSpace;
  component: (typeof validStackComponents)[number];
}

const useStackItem = ({ align, space, component }: UseStackItemProps) =>
  ({
    paddingTop: space,
    display: component === 'span' ? 'block' : undefined,
    // If we're aligned left across all screen sizes,
    // there's actually no alignment work to do.
    ...(align === 'left'
      ? null
      : {
          display: mapResponsiveValue(align, (value) => alignToDisplay[value]),
          flexDirection: 'column' as const,
          alignItems: alignToFlexAlign(align),
        }),
  } as const);

const extractHiddenPropsFromChild = (child: ReactNode) =>
  child && typeof child === 'object' && 'type' in child && child.type === Hidden
    ? (child.props as HiddenProps)
    : null;

const resolveHiddenProps = ({ screen, above, below }: HiddenProps) =>
  screen
    ? ([true, true, true, true] as const)
    : resolveResponsiveRangeProps({
        above,
        below,
      });

const calculateHiddenStackItemProps = (
  stackItemProps: ReturnType<typeof useStackItem>,
  [hiddenOnMobile, hiddenOnTablet, hiddenOnDesktop, hiddenOnWide]: Readonly<
    [boolean, boolean, boolean, boolean]
  >,
) => {
  const normalizedValue = normalizeResponsiveValue(
    stackItemProps.display !== undefined ? stackItemProps.display : 'block',
  );

  const {
    mobile: displayMobile = 'block',
    tablet: displayTablet = displayMobile,
    desktop: displayDesktop = displayTablet,
    wide: displayWide = displayDesktop,
  } = normalizedValue;

  return {
    ...stackItemProps,
    display: optimizeResponsiveArray([
      hiddenOnMobile ? 'none' : displayMobile,
      hiddenOnTablet ? 'none' : displayTablet,
      hiddenOnDesktop ? 'none' : displayDesktop,
      hiddenOnWide ? 'none' : displayWide,
    ]),
  };
};

export interface StackProps {
  component?: (typeof validStackComponents)[number];
  children: ReactNodeNoStrings;
  space: ResponsiveSpace;
  align?: OptionalResponsiveValue<Align>;
  dividers?: boolean | DividerProps['weight'];
  data?: DataAttributeMap;
}

export const Stack = ({
  component = 'div',
  children,
  space = 'none',
  align = 'left',
  dividers = false,
  data,
  ...restProps
}: StackProps) => {
  assert(
    validStackComponents.includes(component),
    `Invalid Stack component: '${component}'. Should be one of [${validStackComponents
      .map((c) => `'${c}'`)
      .join(', ')}]`,
  );

  const stackItemProps = useStackItem({ space, align, component });
  const stackItems = flattenChildren(children);
  const isList = component === 'ol' || component === 'ul';
  const stackItemComponent = isList ? 'li' : component;

  let firstItemOnMobile: number | null = null;
  let firstItemOnTablet: number | null = null;
  let firstItemOnDesktop: number | null = null;
  let firstItemOnWide: number | null = null;

  return (
    <Box
      component={component}
      display={component === 'span' ? 'block' : undefined}
      className={negativeMargin('top', space)}
      {...buildDataAttributes({ data, validateRestProps: restProps })}
    >
      {Children.map(stackItems, (child, index) => {
        assert(
          !(
            typeof child === 'object' &&
            child.type === Hidden &&
            (child.props as HiddenProps).inline !== undefined
          ),
          'The "inline" prop is invalid on Hidden elements within a Stack',
        );

        const hiddenProps = extractHiddenPropsFromChild(child);
        const hidden = hiddenProps
          ? resolveHiddenProps(hiddenProps)
          : ([false, false, false, false] as const);
        const [hiddenOnMobile, hiddenOnTablet, hiddenOnDesktop, hiddenOnWide] =
          hidden;

        const responsivelyHidden =
          hiddenOnMobile || hiddenOnTablet || hiddenOnDesktop || hiddenOnWide;

        if (firstItemOnMobile === null && !hiddenOnMobile) {
          firstItemOnMobile = index;
        }

        if (firstItemOnTablet === null && !hiddenOnTablet) {
          firstItemOnTablet = index;
        }

        if (firstItemOnDesktop === null && !hiddenOnDesktop) {
          firstItemOnDesktop = index;
        }

        if (firstItemOnWide === null && !hiddenOnWide) {
          firstItemOnWide = index;
        }

        return (
          <Box
            component={stackItemComponent}
            className={[
              hiddenProps && hiddenProps.print
                ? hiddenStyles.hiddenOnPrint
                : null,
            ]}
            {...(responsivelyHidden
              ? calculateHiddenStackItemProps(stackItemProps, hidden)
              : stackItemProps)}
          >
            {dividers && index > 0 ? (
              <Box
                component="span"
                width="full"
                paddingBottom={space}
                display={optimizeResponsiveArray([
                  index === firstItemOnMobile ? 'none' : 'block',
                  index === firstItemOnTablet ? 'none' : 'block',
                  index === firstItemOnDesktop ? 'none' : 'block',
                  index === firstItemOnWide ? 'none' : 'block',
                ])}
              >
                {typeof dividers === 'string' ? (
                  <Divider weight={dividers} />
                ) : (
                  <Divider />
                )}
              </Box>
            ) : null}
            {hiddenProps ? hiddenProps.children : child}
          </Box>
        );
      })}
    </Box>
  );
};
