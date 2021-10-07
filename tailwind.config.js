const {
  default: createCards,
} = require('./libs/tailwind/cardsPlugin/createCards');

const rem = (value) => {
  return `${value / 16}rem`;
};

const colors = {
  blue: {
    header: '#203876',
    500: '#193751',
    400: '#041925',
    350: '#11305A',
    300: '#062233',
    250: '#0A1536',
    200: '#0E284F',
    150: '#143DB0',
    100: '#305EED',
    50: '#2f4571',
  },
  gray: {
    700: '#1F3847',
    600: '#4f5e66',
    500: '#2A5D7D',
    400: '#4781A8',
    300: '#80B0C8',
    200: '#BFD8E4',
    150: '#D5DFE9',
    100: '#F2F2F2',
  },
  'blog-gray': {
    500: '#0A1536',
    400: '#f2f2f2',
    300: '#e6e6e6',
    200: '#787878',
    150: '#A8A8A8',
    100: '#B2B2B2',
    50: '#d8d8d8',
  },
  green: {
    500: '#138640',
    400: '#2B9C57',
    350: '#25A055',
    300: '#53D084',
    100: '#9CFFC3',
  },
  red: {
    300: '#E15454',
  },
  white: '#FFFFFF',
  black: '#000000',
  orange: {
    300: '#F2A143',
    100: '#CB7F27',
  },
  soft: 'rgba(99, 152, 255, 0.1)', // header "soft white" border
  'soft-white': 'rgba(255, 255, 255, 0.1)', // our services card "soft white" border
  'white-40': 'rgba(255, 255, 255, 0.4)', // our services card "soft white" border
};

colors.primary = colors.green[300];
colors.secondary = colors.blue[300];

const fontFamily = {
  sans: 'Nunito Sans, serif',
  serif: 'Galano Grotesque Alt, sans-serif',
};

const fontSize = {
  xxs: rem(14),
  xs: rem(16),
  sm: rem(18),
  md: rem(20),
  base: rem(20),
  lg: rem(24),
  xl: rem(28),
  xll: rem(32), // add new
  xxl: rem(36),
  '3xl': rem(44),
  '4xl': rem(50),
};

const lineHeight = {
  3: rem(12),
  4: rem(18),
  5: rem(20),
  6: rem(22),
  7: rem(24),
  8: rem(26),
  9: rem(28),
  10: rem(30),
  11: rem(32),
  12: rem(36),
  12.5: rem(38),
  13: rem(40),
  14: rem(42),
  15: rem(44),
  16: rem(46),
  17: rem(48),
  18: rem(52),
  19: rem(56),
  20: rem(60),
  21: rem(64),
  22: rem(68),
};

const spacing = {
  0.5: rem(2),
  1.5: rem(6),
  1.9: rem(7),
  2.5: rem(10),
  3.5: rem(14),
  4.5: rem(18),
  4.6: rem(19),
  5.5: rem(22),
  6.5: rem(26),
  7: rem(28),
  7.5: rem(30),
  8.5: rem(34),
  10.5: rem(42),
  11: rem(44),
  11.1: rem(45),
  11.5: rem(46),
  12.5: rem(50),
  13: rem(52),
  13.1: rem(53),
  13.6: rem(55),
  14.1: rem(57),
  15: rem(60),
  15.5: rem(62),
  16.1: rem(65),
  16.6: rem(67),
  18: rem(74),
  17.6: rem(71),
  19: rem(76),
  20.1: rem(81),
  20.5: rem(82),
  21: rem(84),
  21.1: rem(85),
  21.6: rem(87),
  22: rem(88),
  22.5: rem(90),
  23: rem(92),
  23.5: rem(94),
  23: rem(92),
  23.6: rem(95),
  25: rem(100),
  26: rem(104),
  27: rem(108),
  28.5: rem(114),
  30: rem(120),
  30.5: rem(122),
  31: rem(124),
  31.1: rem(125),
  31.5: rem(126),
  31.6: rem(127),
  32: rem(128),
  32.5: rem(130),
  33: rem(132),
  34: rem(136),
  35: rem(140),
  37.5: rem(150),
  42: rem(168),
  42.1: rem(169),
  42.5: rem(170),
  43: rem(172),
  43.6: rem(175),
  45: rem(180),
  45.6: rem(183),
  47: rem(188),
  47.5: rem(190),
  48.5: rem(194),
  49: rem(196),
  50: rem(200),
  51.5: rem(206),
  52.5: rem(210),
  53: rem(212),
  53.5: rem(214),
  53.6: rem(215),
  54.5: rem(218),
  55: rem(220),
  55.5: rem(222),
  56.1: rem(225),
  57: rem(228),
  58.5: rem(234),
  59.6: rem(239),
  61.6: rem(247),
  62: rem(250),
  63: rem(254),
  65: rem(260),
  67.5: rem(270),
  68: rem(272),
  68.5: rem(274),
  68.6: rem(275),
  70: rem(280),
  72: rem(288),
  72.5: rem(290),
  72.6: rem(291),
  73.6: rem(295),
  74.6: rem(299),
  75: rem(300),
  76.6: rem(307),
  77.5: rem(310),
  78.6: rem(315),
  81: rem(324),
  81.1: rem(325),
  81.6: rem(327),
  82.5: rem(330),
  83.1: rem(333),
  83.5: rem(334),
  84.5: rem(338),
  86: rem(344),
  86.6: rem(347),
  87.5: rem(350),
  88.1: rem(353),
  90: rem(360),
  91.6: rem(367),
  93.6: rem(375),
  94.6: rem(379),
  96: rem(384),
  97.5: rem(390),
  99.1: rem(397),
  100: rem(400),
  101.5: rem(406),
  103: rem(412),
  103.1: rem(413),
  105: rem(420),
  107: rem(428),
  107.5: rem(430),
  109.5: rem(438),
  110: rem(440),
  111.1: rem(445),
  112.5: rem(450),
  113.1: rem(453),
  114.1: rem(457),
  115: rem(460),
  119: rem(476),
  120: rem(480),
  121.6: rem(487),
  122.5: rem(490),
  124.1: rem(497),
  125: rem(500),
  126.5: rem(506),
  128.5: rem(514),
  130.1: rem(521),
  130.5: rem(522),
  132: rem(528),
  138.6: rem(555),
  139.5: rem(558),
  141: rem(564),
  142.5: rem(570),
  143.6: rem(575),
  145: rem(580),
  146.6: rem(587),
  148: rem(592),
  150: rem(600),
  153: rem(612),
  154.5: rem(618),
  155: rem(620),
  156: rem(624),
  157: rem(628),
  157.6: rem(631),
  160: rem(640),
  162: rem(648),
  164.5: rem(658),
  165: rem(660),
  168: rem(672),
  165.5: rem(662),
  173.6: rem(695),
  180: rem(720),
  185.1: rem(741),
  185.5: rem(742),
  190: rem(760),
  195: rem(780),
  196.6: rem(787),
  200: rem(800),
  204.5: rem(818),
  207.6: rem(831),
  210: rem(840),
  213: rem(852),
  218.6: rem(875),
  223.6: rem(895),
  224.1: rem(897),
  233: rem(932),
  237: rem(948),
  250: rem(1000),
  275: rem(1100),
  280: rem(1120),
  291.5: rem(1166),
  303.25: rem(1213),
  377.5: rem(1510),
  385.5: rem(1542),
  404: rem(1616),
  420: rem(1680),
  500: rem(2000),
  503.25: rem(2013),
  535: rem(2140),
  625: rem(2500),
  xs: rem(414),
  sm: rem(640),
  md: rem(768),
  lg: rem(1080),
  xl: rem(1280),
};

const minHeight = {
  14.1: rem(57),
  15: rem(60),
  22: rem(88),
  51.5: rem(206),
  64: rem(256),
  93.6: rem(375),
  205: rem(820),
};

const boxShadow = {
  'inset-light': 'inset 0px 2px 0px #233057',
  'inset-dark': 'inset 0px 2px 0px #1C1C1C',
  blue: '-4px 4px 0px 0px #1638A2',
  'blog-header': '0px 0px 120px rgba(6, 29, 51, 0.7)',
  'blog-sm': '0px 0px 80px rgba(0, 0, 0, 0.08)',
  'blog-lg': '0px 0px 160px rgba(0, 0, 0, 0.08)',
  'blog-blue': '0px 0px 160px rgba(0, 0, 0, 0.12)',
};

const borderRadius = {
  '2.5xl': rem(20),
  '4xl': rem(28),
  10: rem(40),
  15: rem(60),
  20: rem(80),
};

const cards = {
  variants: {
    white: {
      base: '#FFFFFF',
      shadow: '#D5DFE9',
    },
    gray: {
      base: '#D5DFE9',
      shadow: '#FFFFFF',
    },
    blue: {
      base: '#305EED',
      shadow: '#143DB0',
    },
    green: {
      base: '#53D084',
      shadow: '#25A055',
    },
    orange: {
      base: '#F2A143',
      shadow: '#CB7F27',
    },
  },
};

const opacity = {
  15: '0.15',
};

const scale = {
  65: '0.65',
  79: '0.79',
  85: '0.85',
  86: '0.86',
  92: '0.92',
  93: '0.93',
  94: '0.94',
};

const inset = {
  '1/8': '12.5%',
};

const screens = {
  xs: '414px',
  sm: '640px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '2400px',
  '3k': '3072px',
};

const maxWidth = {
  7.5: rem(30),
  15: rem(60),
  83.5: rem(334),
  189: rem(756),
  203.6: rem(815),
  213: rem(852),
  '8xl': rem(1680),
};

const zIndex = {
  '-10': '-10',
};

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  corePlugins: {
    container: false,
  },
  darkMode: 'media',
  theme: {
    extend: {
      borderRadius,
      colors,
      fontFamily,
      fontSize,
      lineHeight,
      spacing,
      boxShadow,
      opacity,
      scale,
      minHeight,
      maxWidth,
      inset,
      zIndex,
    },
    screens,
    cards,
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      borderStyle: ['focus', 'hover'],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          padding: `0 ${rem(20)}`,

          '@screen md': {
            maxWidth: rem(1080),
            margin: '0 auto',
          },
        },
        '.home-top-grid': {
          display: 'grid',
          transform: 'matrix(0.59, -0.32, 0.59, 0.3, -673, -553)',
          gridTemplateRows: 'repeat(6, 15.375rem)',
          gridTemplateColumns: 'repeat(9, 12.875rem)',
          gridGap: '2px',

          '@screen md': {
            transform: 'matrix(0.64, -0.37, 0.62, 0.39, 600, -516)',
          },

          '@screen lg': {
            gridTemplateColumns: 'repeat(7, 12.875rem)',
            transform: 'matrix(0.64, -0.37, 0.62, 0.39, 44, -476)',
          },
        },
        '.svg-fit svg': {
          height: '100%',
          width: '100%',
        },
        '.fill-current path': {
          fill: 'currentColor',
        },
        '.drop-shadow': {
          filter: 'drop-shadow(0 1.25rem 5rem rgba(0, 0, 0, 0.8))',
        },
        '.scroll-shadow': {
          boxShadow:
            '3.5rem 0 50px 125px rgba(6, 34, 51, 0.3), 3.5rem 0 50px 125px rgba(32, 56, 118, 1)',
        },
        '.scale-left-75': {
          transform: 'translateX(-12.5%) scale(0.75)',
        },
        '.scale-left-65': {
          transform: 'translate(-17.5%, -17.5%) scale(0.65)',
        },
        '.scroll-x-container': {
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
        },
        '.scroll-x-container::-webkit-scrollbar': {
          display: 'none',
        },
        '.scroll-pl-5': {
          scrollPadding: '0 0 0 20px',
        },
        '.scroll-pl-10': {
          scrollPadding: '0 0 0 40px',
        },
        '.scroll-x-item': {
          scrollSnapAlign: 'start',
        },
        '.scroll-x-item-center': {
          scrollSnapAlign: 'center',
        },
        '.button-shadow': {
          boxShadow: '0 -30px 10px 15px #0E284F',
        },
        '.blur-1': {
          filter: 'blur(1px)',
        },
        '.blur-3': {
          filter: 'blur(3px)',
        },
        '.blur-5': {
          filter: 'blur(5px)',
        },
        '.backdrop-blur-20': {
          backdropFilter: `blur(${rem(20)})`,
        },
        '.backdrop-blur-60': {
          backdropFilter: `blur(${rem(60)})`,
        },
        '.backdrop-blur-80': {
          backdropFilter: `blur(${rem(80)})`,
        },
        '.text-shadow-blue': {
          textShadow: '-0.25rem -0.25rem 0 #305EED',
        },
        '.text-shadow-green': {
          textShadow: '-0.25rem -0.25rem 0 #1F7E44',
        },
        '.text-shadow-red': {
          textShadow: '-0.25rem -0.25rem 0 #7E1F1F',
        },
        '.service-points li:nth-child(n + 5)': {
          display: 'none',
          '@screen sm': {
            display: 'block',
          },
        },
        '.service-points li:nth-child(n + 7)': {
          '@screen sm': {
            display: 'none',
          },
        },
        '.image-container img': {
          height: 'inherit',
          width: 'inherit',
          maxWidth: 'none',
        },
        '.article-card:hover .article-cover': {
          boxShadow: '0px 0px 160px rgba(0, 0, 0, 0.1)',
        },
      });
    },
    createCards,
  ],
};
