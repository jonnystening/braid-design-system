import React from 'react';

import type { SVGProps } from '../SVGTypes';

export const IconPlatformAndroidSvg = ({
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
    <path d="m17.09 10.255 1.674-2.891a.577.577 0 0 0-.237-.773.58.58 0 0 0-.754.2l-1.71 2.945a10.42 10.42 0 0 0-8.127 0L6.227 6.791a.584.584 0 0 0-.79-.182.58.58 0 0 0-.2.755l1.672 2.89A9.8 9.8 0 0 0 2 18h20a9.8 9.8 0 0 0-4.91-7.745ZM7.456 15.5a1.137 1.137 0 1 1 0-2.274 1.137 1.137 0 0 1 0 2.274Zm9.09 0a1.137 1.137 0 1 1 .001-2.274 1.137 1.137 0 0 1 0 2.274Z" />
  </svg>
);
