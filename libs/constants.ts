export const __SbImageBaseURL__ = 'https://a.storyblok.com';
export const __SbImageServer__ = 'https://img2.storyblok.com';

export const __fallbackIntroHeading__ = '[intro_hidden]';

export const __hostname__ =
  process.env.NODE_ENV === 'development'
    ? 'localhost:3000'
    : 'yea-temp.vercel.app';

/** @Uncomment this for actual production */
// export const __hostname__ =
//   process.env.NODE_ENV === 'development'
//     ? 'localhost:3000'
//     : 'yeapersonalize.com/';
