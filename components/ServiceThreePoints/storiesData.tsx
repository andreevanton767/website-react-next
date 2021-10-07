import { ThreePoints } from '@/enums/components';

import { ArticlesProps, OrderedProps } from './ServiceThreePoints';

const heading = 'Lowered bounce rate';
const text =
  'When using personalization you keep in mind the needs and preferences of your audience so that you market the right product to the right person at the right time.';

const integrationPoints = [
  {
    heading,
    text,
    image: 'integration-implementation-1',
  },
  {
    heading,
    text,
    image: 'integration-implementation-2',
  },
  {
    heading,
    text,
    image: 'integration-implementation-3',
  },
];

const conversionPoints = [
  {
    heading,
    text,
    image: 'conversion-optimization-2',
  },
  {
    heading,
    text,
    image: 'conversion-optimization-3',
  },
  {
    heading,
    text,
    image: 'conversion-optimization-4',
  },
];

const affiliatePoints = [
  {
    text: 'Circumatances that should trigger a send',
  },
  {
    text: 'Segments of your contacts you want to target',
  },
  {
    text: 'Messages to send you did yesterday',
  },
];

export const integration1 = {
  title: 'Integration / Implementation',
  subtitle: 'What are the pros?',
  type: ThreePoints.Articles,
  points: integrationPoints,
} as ArticlesProps;

export const conversion2 = {
  title: 'Conversion Optimization',
  subtitle: 'What are the pros?',
  type: ThreePoints.Articles,
  points: conversionPoints,
} as ArticlesProps;

export const affiliate1 = {
  title: 'Affiliate Marketing',
  subtitle: 'What are the pros?',
  points: affiliatePoints,
  description: text,
  type: ThreePoints.OrderedList,
  cover: 'affiliate-marketing-1',
} as OrderedProps;
