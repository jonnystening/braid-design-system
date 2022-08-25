import React from 'react';

import type { SVGProps } from '../SVGTypes';

export const IconThumbSvg = ({ title, titleId, ...props }: SVGProps) => (
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
    <path d="M20.847 9.122A2.986 2.986 0 0 0 18.507 8h-4.223A7.098 7.098 0 0 0 15 5a3.1 3.1 0 0 0-2.235-3.318A3.364 3.364 0 0 0 9.08 3.606L6.77 9H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3.796A16.498 16.498 0 0 0 13 21a10.607 10.607 0 0 0 5.855-1.628 2.986 2.986 0 0 0 1.277-1.855l1.304-5.867a2.988 2.988 0 0 0-.59-2.528ZM4 11h2v7H4Zm14.179 6.084a.996.996 0 0 1-.425.62A8.592 8.592 0 0 1 13 19a16.217 16.217 0 0 1-5-.685v-7.11l2.895-6.758a1.348 1.348 0 0 1 1.41-.818C12.933 3.776 13 4.637 13 5a5.93 5.93 0 0 1-1.262 3.353A1 1 0 0 0 12.5 10h6.007a1 1 0 0 1 .975 1.217Z" />
  </svg>
);
