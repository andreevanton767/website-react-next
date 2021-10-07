import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  m as motion,
  AnimatePresence,
  MotionConfig,
  ExitFeature,
  AnimationFeature,
} from 'framer-motion';

import placeholders from './placeholderImages';

import { Service } from '@/enums/components';
import { ScreenSize } from '@/enums/screenSize';

import YImage from '@/components/YImage';

import useBreakpoint from '@/hooks/useBreakpoint';

interface Props {
  service: Service;
  className?: string;
}

const HeroImage: React.FC<Props> = ({ service, className }) => {
  const { screenSize } = useBreakpoint();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 800);
  });

  const displayGraphic: ServiceGraphic = graphics[service];
  const svgImage =
    displayGraphic?.svg[screenSize] || displayGraphic?.svg[ScreenSize.SM];

  const SVGHero = useMemo(
    () => dynamic(() => import(`@/assets/services-hero/${svgImage}.svg`)),
    [screenSize]
  );

  const graphic = !ready ? (
    <YImage
      className="w-full h-full"
      {...displayGraphic.placeholder}
      {...placeholderSizing}
      preload
    />
  ) : (
    <SVGHero />
  );

  return (
    <MotionConfig features={[AnimationFeature, ExitFeature]}>
      <AnimatePresence>
        <motion.div
          key={ready ? 'svg' : 'placeholder-img'}
          initial={ready ? { opacity: 0.4 } : false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.4 }}
          transition={{ type: 'tween', duration: 0.5 }}
          className={[...baseClasses, className].join(' ')}
        >
          {graphic}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
};

const baseClasses = ['svg-fit', 'flex', 'justify-center', 'items-center'];

const placeholderSizing = {
  width: 384,
  height: 320,
  responsive: {
    [ScreenSize.LG]: {
      width: 600,
      height: 500,
    },
  },
};

interface ServiceGraphic {
  svg: { [ScreenSize.SM]: string; [ScreenSize.LG]?: string };
  placeholder: {
    filename: string;
    alt: string;
    srcSet?: Partial<Record<ScreenSize, string>>;
    width: number;
    height: number;
    responsive?: {
      [ScreenSize.LG]: {
        width: number;
        height: number;
      };
    };
  };
}

const graphics: Record<Service, ServiceGraphic> = {
  [Service.IntegrationImplementation]: {
    svg: {
      [ScreenSize.SM]: 'integration-implementation',
    },
    placeholder: {
      filename: placeholders.integrationImplementation,
      alt: 'integration website with underlying code implementation',
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },

  [Service.AffiliateMarketing]: {
    svg: {
      [ScreenSize.SM]: 'affiliate-marketing',
    },
    placeholder: {
      filename: placeholders.affiliateMarketing,
      alt: 'layers of affiliate marketing',
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },

  [Service.OnlineAdvertising]: {
    svg: {
      [ScreenSize.SM]: 'online-advertising',
    },
    placeholder: {
      filename: placeholders.onlineAvertising,
      alt: 'leading social media online advertising companies',
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },

  [Service.EmailMarketing]: {
    svg: {
      [ScreenSize.SM]: 'email-marketing-mobile',
      [ScreenSize.LG]: 'email-marketing',
    },
    placeholder: {
      filename: placeholders.emailMarketingSM,
      alt: 'personalized collection of marketing emails',
      srcSet: {
        [ScreenSize.LG]: placeholders.emailMarketing,
      },
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },

  [Service.Personalization]: {
    svg: {
      [ScreenSize.SM]: 'personalization-mobile',
      [ScreenSize.LG]: 'personalization',
    },
    placeholder: {
      filename: placeholders.personalizationSM,
      alt: 'mobile with personalized icons',
      srcSet: {
        [ScreenSize.LG]: placeholders.personalization,
      },
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },

  [Service.MarketingAutomation]: {
    svg: {
      [ScreenSize.SM]: 'marketing-automation-mobile',
      [ScreenSize.LG]: 'marketing-automation',
    },
    placeholder: {
      filename: placeholders.marketingAutomationSM,
      alt: 'leading online marketing automation companies',
      srcSet: {
        [ScreenSize.LG]: placeholders.marketingAutomation,
      },
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },

  [Service.DataAnalytics]: {
    svg: {
      [ScreenSize.SM]: 'data-analytics-mobile',
      [ScreenSize.LG]: 'data-analytics',
    },
    placeholder: {
      filename: placeholders.dataAnalyticsSM,
      alt: 'analytics of sales and marketing data',
      srcSet: {
        [ScreenSize.LG]: placeholders.dataAnalytics,
      },
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },

  [Service.ConversionOptimization]: {
    svg: {
      [ScreenSize.SM]: 'conversion-optimization',
    },
    placeholder: {
      filename: placeholders.conversionOptimization,
      alt: 'conversion optimization steps',
      width: 384,
      height: 320,
      responsive: {
        [ScreenSize.LG]: {
          width: 600,
          height: 500,
        },
      },
    },
  },
};

export default HeroImage;
