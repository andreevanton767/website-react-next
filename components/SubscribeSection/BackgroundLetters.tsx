import { ScreenSize } from '@/enums/screenSize';

import useBreakpoint from '@/hooks/useBreakpoint';

import SMLeft1 from '@/assets/subscribe-letters/sm-left-1.svg';
import SMLeft2 from '@/assets/subscribe-letters/sm-left-2.svg';
import SMMid1 from '@/assets/subscribe-letters/sm-mid-1.svg';
import SMMid2 from '@/assets/subscribe-letters/sm-mid-2.svg';
import SMRight1 from '@/assets/subscribe-letters/sm-right-1.svg';
import SMRight2 from '@/assets/subscribe-letters/sm-right-2.svg';
import SMRight3 from '@/assets/subscribe-letters/sm-right-3.svg';

import LGLeft1 from '@/assets/subscribe-letters/lg-left-1.svg';
import LGLeft2 from '@/assets/subscribe-letters/lg-left-2.svg';
import LGLeft3 from '@/assets/subscribe-letters/lg-left-3.svg';
import LGMid1 from '@/assets/subscribe-letters/lg-mid-1.svg';
import LGMid2 from '@/assets/subscribe-letters/lg-mid-2.svg';
import LGMid3 from '@/assets/subscribe-letters/lg-mid-3.svg';
import LGMid4 from '@/assets/subscribe-letters/lg-mid-4.svg';
import LGRight1 from '@/assets/subscribe-letters/lg-right-1.svg';
import LGRight2 from '@/assets/subscribe-letters/lg-right-2.svg';
import LGRight3 from '@/assets/subscribe-letters/lg-right-3.svg';

const BackgroundLetters: React.FC = () => {
  const { screenSize } = useBreakpoint([ScreenSize.SM, ScreenSize.LG]);

  const contentSM = (
    <>
      <div className="absolute top-12.5 left-0">
        <SMLeft2 />
      </div>
      <div className="absolute top-0 left-0">
        <SMLeft1 />
      </div>
      <div className="absolute top-1 left-1/2 transform -translate-x-16.6">
        <SMMid1 />
      </div>
      <div className="absolute top-8 left-1/2 transform -translate-x-28.5">
        <SMMid2 />
      </div>
      <div className="absolute top-0 right-0">
        <SMRight1 />
      </div>
      <div className="absolute top-0 right-0">
        <SMRight2 />
      </div>
      <div className="absolute top-10 right-0">
        <SMRight3 />
      </div>
    </>
  );

  const contentLG = (
    <>
      <div className="absolute top-0 left-0">
        <LGLeft1 />
      </div>
      <div className="absolute bottom-0 left-0">
        <LGLeft2 />
      </div>
      <div className="absolute bottom-0 left-0">
        <LGLeft3 />
      </div>
      <div className="absolute top-0 right-70">
        <LGMid1 />
      </div>
      <div className="absolute top-12 right-32">
        <LGMid2 />
      </div>
      <div className="absolute top-13.1 right-42.1">
        <LGMid3 />
      </div>
      <div className="absolute bottom-0 right-35">
        <LGMid4 />
      </div>
      <div className="absolute top-0 right-0">
        <LGRight1 />
      </div>
      <div className="absolute bottom-0 right-0">
        <LGRight2 />
      </div>
      <div className="absolute bottom-0 right-0">
        <LGRight3 />
      </div>
    </>
  );

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 -z-10">
      {screenSize == ScreenSize.SM ? contentSM : contentLG}
    </div>
  );
};

export default BackgroundLetters;
