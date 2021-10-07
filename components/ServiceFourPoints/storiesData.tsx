import ServiceFourPoints from './ServiceFourPoints';

import { FourPoints } from '@/enums/components';

const description =
  'When using personalization you keep in mind the needs and preferences of your audience so that you market the right product to the right person at the right time.';

const integrationPoints = [
  {
    heading: 'Increased trust',
    text:
      'When using personalization, you keep in mind the needs and preferances of your.',
  },
  {
    heading: 'Increased trust',
    text:
      'When using personalization, you keep in mind the needs and preferances of your.',
  },
  {
    heading: 'Increased trust',
    text:
      'When using personalization, you keep in mind the needs and preferances of your.',
  },
  {
    heading: 'Increased trust',
    text:
      'When using personalization, you keep in mind the needs and preferances of your.',
  },
];

const advertisingPoints = [
  {
    heading: '74%',
    text:
      'get frustrated when offers/ads have nothing to do with their interests',
  },
  {
    heading: '57%',
    text:
      'would leave a site if they were married and shown an add for dataing service',
  },
  {
    heading: '74%',
    text: 'are ok providing personal infromation for their benefit',
  },
  {
    heading: '77%',
    text:
      'would trust companies more if they explained how they were using their information',
  },
];

export const integration3 = {
  title: 'Integration / Implementation',
  subtitle: 'What are the pros?',
  description,
  points: integrationPoints,
  cover: 'integration-implementation-4',
} as Parameters<typeof ServiceFourPoints>[0];

export const online3 = {
  title: 'Online Advertsing',
  subtitle: 'What are the pros?',
  description,
  points: advertisingPoints,
  type: FourPoints.Stats,
  cover: 'social-media-advertising-1',
} as Parameters<typeof ServiceFourPoints>[0];

export const email1 = {
  title: 'Email Marketing',
  subtitle: 'What are the pros?',
  description,
  points: integrationPoints,
  cover: 'email-marketing-2',
} as Parameters<typeof ServiceFourPoints>[0];

export const personalization2 = {
  title: 'Personalization',
  subtitle: 'What are the pros?',
  description,
  points: advertisingPoints,
  type: FourPoints.Stats,
  cover: 'personalization-1',
} as Parameters<typeof ServiceFourPoints>[0];
