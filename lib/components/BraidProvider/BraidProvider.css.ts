import { globalFontFace } from '@vanilla-extract/css';
// @ts-ignore
import gorditaRegular from './Gordita/gordita-regular.otf';
// @ts-ignore
import gorditaMedium from './Gordita/gordita-medium.otf';
// @ts-ignore
import gorditaStrong from './Gordita/gordita-bold.otf';

globalFontFace('Gordita', {
  src: `url("${gorditaRegular}") format("opentype")`,
  fontWeight: 400,
});

globalFontFace('Gordita', {
  src: `url("${gorditaMedium}") format("opentype")`,
  fontWeight: 500,
});

globalFontFace('Gordita', {
  src: `url("${gorditaStrong}") format("opentype")`,
  fontWeight: 700,
});
