import React from 'react';

import type { SVGProps } from '../SVGTypes';

export const IconSocialYouTubeSvg = ({
  title,
  titleId,
  ...props
}: SVGProps) => (
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
    <path d="M22 12a26.362 26.362 0 0 1-.418 4.845 2.513 2.513 0 0 1-1.768 1.78c-1.56.42-7.814.42-7.814.42s-6.254 0-7.814-.42a2.513 2.513 0 0 1-1.768-1.78A26.362 26.362 0 0 1 2 12a26.362 26.362 0 0 1 .418-4.845 2.513 2.513 0 0 1 1.768-1.78c1.56-.42 7.814-.42 7.814-.42s6.254 0 7.814.42a2.513 2.513 0 0 1 1.768 1.78A26.362 26.362 0 0 1 22 12ZM9.955 14.974 15.182 12 9.955 9.026Z" />
  </svg>
);
