import { lighten, darken, saturate, rgba } from 'polished';
import { palette } from '../../color/palette';
import { makeTokens } from '../baseTokens/apac';

const brandAccent = palette.seekPink['500'];
const brandAccentSoft = palette.seekPink['50'];

const updatedPalette = {
  grey: {
    // 900: '#10141D',
    800: '#1A202B',
    700: '#293040',
    // 600: '#3A475B',
    600: '#333E50', // '#3A475B',
    // 500: '#5A6881',
    // 400: '#8290A5',
    300: '#B8C0CC',
    // 200: '#DBDEE5', // old
    200: '#E3E6EB',
    100: '#F1F3F6',
    // 50: '#F8F9FB',
  },
  red: {
    // 900: '#750808',
    800: '#8E0F0F',
    700: '#AA1B1B',
    600: '#CE2929',
    // 500: '#F94343',
    // 400: '#FB6E6E',
    300: '#FCAAAA',
    200: '#FED2D2',
    100: '#FFE9E9',
    // 50: '#FFF3F3',
  },
  purple: {
    // 900: '#3E0F65',
    800: '#541B7D',
    700: '#702D9A',
    600: '#9544C0',
    // 500: '#BE68E8',
    // 400: '#D48EF1',
    300: '#E6BDF7',
    200: '#F3DCFA',
    100: '#FAF2FE',
    // 50: '#FDF7FE',
  },
  violet: {
    // 900: '#0F0C64',
    800: '#1B167C',
    700: '#2B2599',
    600: '#4037BE',
    // 500: '#6256E6',
    // 400: '#8A7FEF',
    300: '#BBB4F6',
    200: '#DCD8FA',
    100: '#F2EFFD',
    // 50: '#F7F6FE',
  },
  blue: {
    // 900: '#092356',
    800: '#10346F',
    700: '#1A4B8E',
    600: '#2768B6',
    // 500: '#3E8FE0',
    // 400: '#6BB0EC',
    300: '#A8D2F4',
    200: '#D2E8FA',
    100: '#ECF6FD',
    // 50: '#F3FBFE',
  },
  mint: {
    // 900: '#063921',
    800: '#094E30',
    700: '#106B45',
    600: '#188F63',
    // 500: '#28B888',
    // 400: '#58D0AA',
    300: '#9CE4CF',
    200: '#CCF2E7',
    100: '#EBFAF6',
    // 50: '#F3FDFB',
  },
  yellow: {
    // 900: '#723F03',
    800: '#8D5507',
    700: '#AB730C',
    600: '#D49913',
    // 500: '#FDC221',
    // 400: '#FED651',
    300: '#FEE897',
    200: '#FFF4C9',
    100: '#FFFAE7',
    // 50: '#FFFDF1',
  },
};

export default makeTokens({
  name: 'seekJobs',
  displayName: 'SEEK Jobs',
  brand: palette.seekBlue['500'],
  brandAccent,
  brandAccentLight: palette.seekPink['200'],
  brandAccentActive: darken(0.05, brandAccent),
  brandAccentHover: lighten(0.05, brandAccent),
  brandAccentSoft,
  brandAccentSoftActive: darken(0.05, brandAccentSoft),
  brandAccentSoftHover: darken(0.025, brandAccentSoft),
  tokenOverrides: {
    typography: {
      fontFamily:
        'SeekSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
      webFont: 'https://www.seek.com.au/static/shared-web/seeksans.css',
      fontMetrics: {
        capHeight: 783,
        ascent: 1057,
        descent: -274,
        lineGap: 0,
        unitsPerEm: 1000,
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        strong: 500,
      },
      heading: {
        weight: {
          weak: 'regular',
          regular: 'medium',
        },
        level: {
          '1': {
            mobile: {
              fontSize: 28,
              lineGap: 11,
            },
            tablet: {
              fontSize: 36,
              lineGap: 14,
            },
          },
          '2': {
            mobile: {
              fontSize: 24,
              lineGap: 11,
            },
            tablet: {
              fontSize: 30,
              lineGap: 13,
            },
          },
          '3': {
            mobile: {
              fontSize: 22,
              lineGap: 10,
            },
            tablet: {
              fontSize: 24,
              lineGap: 11,
            },
          },
          '4': {
            mobile: {
              fontSize: 20,
              lineGap: 9,
            },
            tablet: {
              fontSize: 20,
              lineGap: 9,
            },
          },
        },
      },
      text: {
        large: {
          mobile: {
            fontSize: 18,
            lineGap: 13,
          },
          tablet: {
            fontSize: 18,
            lineGap: 13,
          },
        },
        standard: {
          mobile: {
            fontSize: 16,
            lineGap: 12,
          },
          tablet: {
            fontSize: 16,
            lineGap: 12,
          },
        },
        small: {
          mobile: {
            fontSize: 14,
            lineGap: 10,
          },
          tablet: {
            fontSize: 14,
            lineGap: 10,
          },
        },
        xsmall: {
          mobile: {
            fontSize: 12,
            lineGap: 9,
          },
          tablet: {
            fontSize: 12,
            lineGap: 9,
          },
        },
      },
    },
    shadows: {
      small: [
        `0 1px 4px ${rgba(palette.grey['800'], 0.03)}`,
        `0 1px 2px 2px ${rgba(palette.grey['800'], 0.05)}`,
        `0 2px 3px ${rgba(palette.grey['800'], 0.08)}`,
      ].join(', '),
      medium: [
        `0 1px 6px ${rgba(palette.grey['800'], 0.05)}`,
        `0 4px 5px 2px ${rgba(palette.grey['800'], 0.1)}`,
        `0 12px 15px ${rgba(palette.grey['800'], 0.14)}`,
      ].join(', '),
      large: [
        `0 1px 8px ${rgba(palette.grey['800'], 0.05)}`,
        `0 8px 10px 3px ${rgba(palette.grey['800'], 0.1)}`,
        `0 20px 25px ${rgba(palette.grey['800'], 0.11)}`,
        `0 45px 60px ${rgba(palette.grey['800'], 0.12)}`,
      ].join(', '),
    },
    space: {
      // gutter: 100,
      xxxsmall: 1,
      xxsmall: 2,
      xsmall: 3,
      small: 4,
      medium: 6,
      large: 8,
      xlarge: 12,
      xxlarge: 16,
      xxxlarge: 24,
    },
    focusRingSize: 4,
    border: {
      radius: {
        small: '4px',
        standard: '8px',
        large: '16px',
        xlarge: '24px',
      },
      color: {
        // neutralLight: '#DEE1E8', // grey150
        // neutralLight: palette.grey['100'],
        formAccent: palette.violet['500'],
        formAccentLight: updatedPalette.violet['300'],
        focus: rgba(updatedPalette.violet['300'], 0.7),

        // Updated tones
        cautionLight: updatedPalette.yellow['300'],
        critical: updatedPalette.red['600'],
        criticalLight: updatedPalette.red['300'],
        info: updatedPalette.blue['600'],
        infoLight: updatedPalette.blue['300'],
        neutral: updatedPalette.grey['600'],
        neutralLight: updatedPalette.grey['200'],
        positive: updatedPalette.mint['600'],
        positiveLight: updatedPalette.mint['300'],
        promote: updatedPalette.purple['600'],
        promoteLight: updatedPalette.purple['300'],
      },
    },
    color: {
      foreground: {
        formAccent: palette.violet['500'],
        formAccentLight: updatedPalette.violet['300'],
        link: palette.violet['500'],
        linkHover: palette.violet['500'],
        linkLight: updatedPalette.violet['300'],
        linkVisited: updatedPalette.purple['600'],
        linkLightVisited: updatedPalette.purple['300'],

        // Updated tones
        cautionLight: updatedPalette.yellow['300'],
        critical: updatedPalette.red['600'],
        criticalLight: updatedPalette.red['300'],
        info: updatedPalette.blue['600'],
        infoLight: updatedPalette.blue['300'],
        neutral: updatedPalette.grey['600'],
        positive: updatedPalette.mint['700'],
        positiveLight: updatedPalette.mint['300'],
        promote: updatedPalette.purple['600'],
        promoteLight: updatedPalette.purple['300'],
      },
      background: {
        brand: palette.seekBlue['700'],
        formAccent: palette.violet['500'],
        formAccentActive: darken(0.05, palette.violet['500']),
        formAccentHover: saturate(0.5, lighten(0.075, palette.violet['500'])),
        formAccentSoft: palette.violet['50'],
        formAccentSoftActive: darken(0.05, palette.violet['50']),
        formAccentSoftHover: darken(0.025, palette.violet['50']),

        surfaceDark: updatedPalette.grey['800'],

        // Updated tones
        cautionLight: updatedPalette.yellow['100'],
        critical: updatedPalette.red['600'],
        criticalActive: darken(0.05, updatedPalette.red['600']),
        criticalHover: saturate(0.1, lighten(0.05, updatedPalette.red['600'])),
        criticalLight: updatedPalette.red['100'],
        info: updatedPalette.blue['600'],
        infoLight: updatedPalette.blue['100'],
        neutral: updatedPalette.grey['700'],
        neutralLight: updatedPalette.grey['100'],
        positive: updatedPalette.mint['700'],
        positiveLight: updatedPalette.mint['100'],
        promote: updatedPalette.purple['600'],
        promoteLight: updatedPalette.purple['100'],
      },
    },
  },
});
