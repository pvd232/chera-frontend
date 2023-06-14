import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import LexendDeca from './static/fonts/LexendDeca-Regular.ttf';
import fontEqualizer from './helpers/fontEqualizer';
import ScreenSize from './types/enums/ScreenSize';
const themeBase = createTheme({
  palette: {
    olive: {
      // main: '#ff3e56',
      // secondary: '#ff2e48',
      main: '#D4218D',
      secondary: '#FFEDF8',
      tertiary: '#fcb052',
      quaternary: '#fee1be',
    },
    orange: {
      main: '#ffa40c',
      secondary: '#fb971c',
      tertiary: '#fcb052',
      quaternary: '#fee1be',
    },
    // fucia: {
    //   main: '#ff3e56',
    //   secondary: '#ffd5da',
    // },
    fucia: {
      main: '#D4218D',
      secondary: '#FFEDF8',
    },
    blue: {
      main: '#5AA9E6',
      secondary: '#7FC8F8',
      tertiary: '#BBDDFF',
    },
    oliveCompliment: {
      main: '#0473fb',
      secondary: '#75b2fd',
      tertiary: 'rgba(211,216,157,1)',
    },
    splashPageOrangeYellow: {
      main: '#ffd491',
    },
    tanCompliment: {
      main: '#fca53c',
    },
    rose: {
      main: '#f8746d',
      secondary: '#fa9a94',
    },
    lightGreen: {
      main: '#0cd450',
      secondary: '#27f36d',
    },
    cottonCandy: {
      main: '#ffe5e5ff',
    },
    black: {
      main: 'rgba(0,0,0,1.0)',
    },
    white1: {
      main: '#FFFFFF',
    },
    lightGrey: {
      main: '#b7b7b7',
      secondary: '#f3f3f3',
    },
    lightGreyBorderBottom: {
      main: '#dedede',
    },
    darkGrey: {
      main: '#434343',
      secondary: '#666666',
    },
    secondaryText: {
      main: '#595959',
    },
  },
  typography: {
    fontFamily: 'LexendDeca',
    color: '#000000',
  },
  border: {
    radius: {
      small: '5px',
      medium: '10px',
      large: '15px',
    },
    boxShadow: {
      small: '0px 0px 5px 0px rgba(0,0,0,0.2)',
      medium: '0px 0px 10px 0px rgba(0,0,0,0.2)',
      large: '0px 0px 15px 0px rgba(0,0,0,0.2)',
    },
  },
  // 1920 is the screen size of my monitor
  // 1200 is the size of my laptop
  extraLargeScreen: () => window.innerWidth > ScreenSize.lg,
  largeScreen: () =>
    window.innerWidth >= ScreenSize.md && window.innerWidth <= ScreenSize.xl,
  mediumScreen: () =>
    window.innerWidth <= ScreenOrientation.lg &&
    window.innerWidth > ScreenOrientation.sm,
  smallScreen: () =>
    window.innerWidth <= ScreenOrientation.md &&
    window.innerWidth > ScreenOrientation.xs,
  extraSmallScreen: () =>
    window.innerWidth <= ScreenOrientation.sm && window.innerHeight >= 800,
  extraExtraSmallScreen: () =>
    window.innerWidth <= ScreenOrientation.xs && window.innerHeight < 800,

  largerScreen: () => window.innerWidth >= ScreenOrientation.sm,
  smallerScreen: () => window.innerWidth <= ScreenOrientation.md,
  extraSmallerScreen: () => window.innerWidth <= ScreenOrientation.sm,
  tablet: () =>
    window.innerWidth > 700 &&
    window.innerWidth < 1000 &&
    window.innerHeight > 900,
  fontSize: {
    linkText: window.innerWidth <= 900 ? '.9rem' : '1.3rem',
    linkSymbol: window.innerWidth <= 900 ? '1.5' : '1.7rem',
  },
  fontEqualizer: (fontSize, isGoogleSlidesFont = false) => {
    if (isGoogleSlidesFont === true) {
      fontSize = fontSize * 2.6667;
    }
    if (window.innerWidth < 450) {
      const newFontSize = (() => {
        const ratio = window.innerWidth / fontSize;
        const desiredRatio = (() => {
          if (fontSize <= 28) {
            return 470 / fontSize;
          } else {
            return 550 / fontSize;
          }
        })();

        const differenceInRatios = ratio / desiredRatio;
        return fontSize * differenceInRatios;
      })();
      return newFontSize;
    } else {
      return fontSize;
    }
  },
  pages: {
    splash: {
      fontSize: {
        header: fontEqualizer(40, false),
        subHeader: fontEqualizer(18, false),
        button: fontEqualizer(13, false),
      },
      spacing: {
        pages: { padding: '12vh' },
        header: {
          marginBottom: '8vh',
        },
      },
      color: {
        lightBlue: '#BBDDFF',
        lightGreen: '#73C371',
      },
    },
    about: {
      fontSize: {
        body: '1.5rem',
        signature: '2rem',
      },
    },
    resources: {
      fontSize: {
        header: fontEqualizer(42, false),
        cardTitle: fontEqualizer(16, false),
      },
      spacing: {
        pages: { padding: '12vh' },
        header: {
          marginBottom: '8vh',
        },
      },
      color: {
        lightBlue: '#BBDDFF',
        lightGreen: '#73C371',
      },
    },
    signUp: {
      color: {
        lightBlue: '#BBDDFF',
      },
    },
  },
  components: {
    MuiCssBaseline: {
      // These fonts can support more unicode ranges (character sets associated with different alphabets) but i dont see a need to import them now. the raleway import was in the MUI documentation, also unicode range is optional
      styleOverrides: `
        @font-face {
            font-family: 'LexendDeca';
            font-style: normal;
            font-weight: 400;
            src: local('LexendDeca'), local('LexendDeca-Regular'), url("${LexendDeca}") format('woff2');
        },
      `,
    },
  },
});
const customTheme = responsiveFontSizes(themeBase);
export default customTheme;
