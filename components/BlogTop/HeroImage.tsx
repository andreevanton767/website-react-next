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
    const heroTimeout = setTimeout(() => setReady(true), 800);

    return () => {
      clearTimeout(heroTimeout);
    };
  });

  const displayGraphic: ServiceGraphic = graphics[service];
  const svgImage = displayGraphic.svg;

  const SVGHero = useMemo(
    () => dynamic(() => import(`@/assets/services-hero/${svgImage}.svg`)),
    [screenSize]
  );

  const graphic = !ready ? (
    <YImage
      className="w-full h-auto"
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
  width: 338,
  height: 0,
  responsive: {
    [ScreenSize.LG]: {
      width: 600,
      height: 0,
    },
  },
};

interface ServiceGraphic {
  svg: string;
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
    svg: 'integration-implementation',
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
    svg: 'affiliate-marketing',
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
    svg: 'online-advertising',
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
    svg: 'email-marketing',
    placeholder: {
      filename: placeholders.emailMarketing,
      alt: 'personalized collection of marketing emails',
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
    svg: 'personalization-blog',
    placeholder: {
      filename: placeholders.personalization,
      alt: 'mobile with personalized icons',
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
    svg: 'marketing-automation',
    placeholder: {
      filename: placeholders.marketingAutomation,
      alt: 'leading online marketing automation companies',
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
    svg: 'data-analytics',
    placeholder: {
      filename: placeholders.dataAnalytics,
      alt: 'analytics of sales and marketing data',
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
    svg: 'conversion-optimization',
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
