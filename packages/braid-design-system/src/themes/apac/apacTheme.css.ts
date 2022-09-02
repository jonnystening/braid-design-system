import { lighten, darken } from 'polished';

import { palette } from '../../color/palette';
import { makeTokens } from '../baseTokens/apac';
import { makeBraidTheme } from '../makeBraidTheme';

const brandAccent = palette.seekPink['500'];
const brandAccentSoft = palette.seekPink['50'];

const tokens = makeTokens({
  name: 'apac',
  displayName: 'APAC',
  brand: palette.seekBlue['500'],
  brandAccent,
  brandAccentLight: palette.seekPink['200'],
  brandAccentActive: darken(0.05, brandAccent),
  brandAccentHover: lighten(0.05, brandAccent),
  brandAccentSoft,
  brandAccentSoftActive: darken(0.05, brandAccentSoft),
  brandAccentSoftHover: darken(0.025, brandAccentSoft),
});

export default makeBraidTheme(tokens);
