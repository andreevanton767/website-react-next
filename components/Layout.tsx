import React, { useContext, useEffect, useState } from 'react';
import SbEditable from 'storyblok-react';
import {
  m as motion,
  MotionConfig,
  AnimationFeature,
  ExitFeature,
  AnimatePresence,
} from 'framer-motion';

import Head from '@/components/Head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YConditionalWrapper from '@/components/YConditionalWrapper';

import { mapHeaderProps, mapFooterProps } from '@/utils/storyblok/layout';

import { ImgFormatProvider } from '@/context/ImgFormatContext';
import { GlobalStateContext } from '@/store/GlobalStateContext';
import { useRouter } from 'next/router';
import { init as initSegment } from '@/assets/js/segment';

const Layout: React.FC = ({ children }) => {
  const {
    header,
    footer,
    editableContent,
    metaContent,
    locales,
    firstRender,
  } = useContext(GlobalStateContext);

  const sbEditableWrapper = ({ children }: { children?: React.ReactNode }) => (
    <SbEditable content={editableContent}>{children}</SbEditable>
  );

  useEffect(() => {
    if (!window?.analytics) {
      initSegment(process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY);
    }
  }, []);

  // control page transitions
  const router = useRouter();

  const path = router ? router.asPath.replace(/\?.*/, '') : '';
  const locale = router ? router.locale : '';

  const route = `${locale}${path}`;

  useEffect(() => {
    window?.analytics.page();
  }, [route]);

  const transitionProps = {
    initial: firstRender
      ? false
      : {
          opacity: 0,
          y: -50,
        },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.4,
      type: 'tween',
    },
  };

  return (
    <MotionConfig features={[AnimationFeature, ExitFeature]}>
      <div className="relative text-white w-full overflow-hidden">
        <Head {...metaContent} />
        <ImgFormatProvider>
          <YConditionalWrapper
            condition={Boolean(editableContent)}
            wrapper={sbEditableWrapper}
          >
            {header && <Header {...mapHeaderProps(header, locales)} />}

            <AnimatePresence exitBeforeEnter>
              <motion.main key={route} {...transitionProps}>
                {children}
              </motion.main>
            </AnimatePresence>

            {footer && <Footer {...mapFooterProps(footer, locales)} />}
          </YConditionalWrapper>
        </ImgFormatProvider>
      </div>
    </MotionConfig>
  );
};

export default Layout;
