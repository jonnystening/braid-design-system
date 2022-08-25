import React from 'react';

import type { SVGProps } from '../SVGTypes';

export const IconArrowSvg = ({ title, titleId, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    focusable="false"
    fill="currentColor"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m11.293 4.293-7 7a1 1 0 1 0 1.414 1.414L11 7.414V19a1 1 0 1 0 2 0V7.414l5.293 5.293a1 1 0 1 0 1.414-1.414l-7-7a1 1 0 0 0-1.414 0Z" />
  </svg>
);
