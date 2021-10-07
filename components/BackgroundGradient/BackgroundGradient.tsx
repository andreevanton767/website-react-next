import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';

import { PageBackground } from '@/enums/components';

import Home1 from '@/assets/fade-highlights/highlight-home-1.svg';
import Home2 from '@/assets/fade-highlights/highlight-home-2.svg';
import Home3 from '@/assets/fade-highlights/highlight-home-3.svg';

import About1 from '@/assets/fade-highlights/highlight-about-1.svg';
import About2 from '@/assets/fade-highlights/highlight-about-2.svg';

import Service1 from '@/assets/fade-highlights/highlight-service-1.svg';
import Service2 from '@/assets/fade-highlights/highlight-service-2.svg';

import Contact from '@/assets/fade-highlights/highlight-contact.svg';

interface Props {
  page: PageBackground;
}

const BackgroundGradient: React.FC<Props> = ({ page }) => {
  const content = {} as Record<PageBackground, JSX.Element>;

  content[PageBackground.Home] = (
    <>
      <div className="absolute" style={{ top: 545, left: 550 }}>
        <Home1 />
      </div>
      <div className="absolute" style={{ top: 1200, left: -900 }}>
        <Home2 />
      </div>
      <div className="absolute" style={{ top: 3950, left: -300 }}>
        <Home3 />
      </div>
    </>
  );

  content[PageBackground.About] = (
    <>
      <div className="absolute" style={{ top: 100, right: -700, zIndex: 1 }}>
        <About1 />
      </div>
      <div className="absolute" style={{ top: 1400, left: -500 }}>
        <About2 />
      </div>
    </>
  );

  content[PageBackground.Service] = (
    <>
      <div className="absolute" style={{ top: -400, left: -1100 }}>
        <Service1 />
      </div>
      <div className="absolute" style={{ top: 1800, right: -800 }}>
        <Service2 />
      </div>
    </>
  );

  content[PageBackground.Contact] = (
    <>
      <div className="absolute" style={{ top: -600, left: -500, zIndex: 1 }}>
        <Contact />
      </div>
    </>
  );

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const bgTimeout = setTimeout(() => setReady(true), 300);

    return () => {
      clearTimeout(bgTimeout);
    };
  }, [page]);

  return (
    <AnimatePresence>
      {ready
        ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="relative container h-full"
            >
              {content[page]}
            </motion.div>
          ) || null
        : null}
    </AnimatePresence>
  );
};

export default BackgroundGradient;
