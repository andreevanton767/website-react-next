// import smoothScroll from 'smoothscroll-polyfill';
import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import { SSRProvider } from '@react-aria/ssr';

import { Language } from '@/enums/language';

import Layout from '@/components/Layout';

import GlobalStateProvider from '@/store/GlobalStateContext';

import '@/styles/tailwind.css';
// import css file for code block syntax highlighting (in post body)
import 'highlight.js/styles/stackoverflow-dark.css';

import { getLanguages } from '@/libs/api/i18n';

interface AdditionalProps {
  locales: Language[];
  isWebsite: boolean;
}

type Props = AppProps & AdditionalProps;

function MyApp({
  Component,
  pageProps,
  locales,
  isWebsite,
}: Props): JSX.Element {
  return (
    <SSRProvider>
      <div suppressHydrationWarning>
        <GlobalStateProvider locales={locales} isWebsite={isWebsite}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalStateProvider>
      </div>
    </SSRProvider>
  );
}

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & AdditionalProps> => {
  // get isWebsite (for website pages)
  const isWebsite = Boolean(appContext.ctx.query.page);

  // get async data
  const [
    appInitialProps,
    {
      data: {
        Space: { languageCodes },
      },
    },
  ] = await Promise.all([
    App.getInitialProps(appContext),
    getLanguages({ preview: false }),
  ]);

  return { ...appInitialProps, isWebsite, locales: languageCodes };
};

export default MyApp;
