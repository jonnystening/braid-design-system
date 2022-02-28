import assert from 'assert';
import React, { createContext, ReactNode, useContext } from 'react';
import { optimizeResponsiveArray } from '../../utils/optimizeResponsiveArray';
import { Box } from '../Box/Box';
import { ColumnsContext, ColumnsContextValue } from '../Columns/ColumnsContext';
import buildDataAttributes, {
  DataAttributeMap,
} from '../private/buildDataAttributes';
import * as styles from './Column.css';

export interface ColumnProps {
  children: ReactNode;
  width?: keyof typeof styles.width | 'content';
  data?: DataAttributeMap;
}

const ColumnContext = createContext<ColumnsContextValue | null>(null);
const AutoWrappedColumnContext = createContext(false);

export const AutoColumn = ({ children }: { children: ReactNode }) => (
  <AutoWrappedColumnContext.Provider value={true}>
    <Column>{children}</Column>
  </AutoWrappedColumnContext.Provider>
);

export const Column = ({ children, data, width }: ColumnProps) => {
  const isAutoWrapped = useContext(AutoWrappedColumnContext);
  const columnsContext = useContext(ColumnsContext);
  const {
    collapseMobile,
    collapseTablet,
    collapseDesktop,
    mobileSpace,
    tabletSpace,
    desktopSpace,
    wideSpace,
    collapsibleAlignmentChildProps,
    component,
  } = columnsContext;
  const columnContext = useContext(ColumnContext);

  assert(
    columnContext !== columnsContext,
    isAutoWrapped
      ? 'Direct children of `Columns` are automatically wrapped in a `Column` if they are not already an instance of one. If you’re seeing this you have likely abstracted a `Column` into a separate component. See documentation for more information: https://seek-oss.github.io/braid-design-system/components/Columns#developer-considerations'
      : 'A `Column` should not be nested inside another `Column` directly without a parent `Columns` component.',
  );

  return (
    <ColumnContext.Provider value={columnsContext}>
      <Box
        component={component}
        display={component === 'span' ? 'block' : undefined}
        minWidth={0}
        width={width !== 'content' ? 'full' : undefined}
        flexShrink={width === 'content' ? 0 : undefined}
        className={[
          styles.column,
          width !== 'content' ? styles.width[width!] : null,
        ]}
        {...(data ? buildDataAttributes(data) : undefined)}
      >
        <Box
          paddingLeft={optimizeResponsiveArray([
            collapseMobile ? 'none' : mobileSpace,
            collapseTablet ? 'none' : tabletSpace,
            collapseDesktop ? 'none' : desktopSpace,
            wideSpace,
          ])}
          paddingTop={
            collapseMobile || collapseTablet || collapseDesktop
              ? optimizeResponsiveArray([
                  collapseMobile ? mobileSpace : 'none',
                  collapseTablet ? tabletSpace : 'none',
                  collapseDesktop ? desktopSpace : 'none',
                  'none',
                ])
              : undefined
          }
          height="full"
          {...collapsibleAlignmentChildProps}
          className={styles.columnContent}
        >
          {children}
        </Box>
      </Box>
    </ColumnContext.Provider>
  );
};
