import { Service } from '@/enums/components';

const socialMedia = {
  shareLabel: 'Share',
  links: [
    {
      icon: 'linkedin',
      link: 'https://www.linkedin.com/company/yeapersonalize',
      name: 'linkedin',
    },
    {
      icon: 'facebook',
      link: 'https://facebook.com/yeapersonalize',
      name: 'facebook',
    },
    {
      icon: 'youtube',
      link: 'https://youtube.com/yeapersonalize',
      name: 'youtube',
    },
    {
      icon: 'instagram',
      link: 'https://instagram.com/yeapersonalize',
      name: 'instagram',
    },
    {
      icon: 'twitter',
      link: 'https://twitter.com/yeapersonalize',
      name: 'twitter',
    },
  ],
};
export const authors = [
  {
    name: 'Younes El Attar',
    role: 'Founder at YEA Personalisation.',
    title: 'Graduate of MIT.',
    interests: 'Fitnes, MMA, Libertarian.',
    image: {
      filename:
        'https://a.storyblok.com/f/98632/220x220/b558395c03/team-member-2.jpg',
    },
  },
  {
    name: 'Pavel Ryaposov',
    role: 'Product Designer at Boldking.',
    title: 'Graduate of MIT.',
    interests: 'Fitnes, MMA, Libertarian.',
    image: {
      filename:
        'https://a.storyblok.com/f/98632/220x220/11856f6cda/team-member-3.jpg',
    },
  },
];

export const props = {
  tags: [
    { label: 'Custdev', color: '#53D084' },
    { label: 'Growth', color: '#305EED' },
  ],
  title: 'A Product Launch & Growth Checklist',
  intro: 'Customers want to be attracted, to know that a brand cares about.',
  category: Service.Personalization,
  date: new Date(Date.now()).toString(),
  views: 34,
  graphic: 'conversion-optimization-1',
  socialMedia,
  authors,
};

export const propsWithImage = {
  tags: [
    { label: 'Custdev', color: '#53D084' },
    { label: 'Growth', color: '#305EED' },
  ],
  title: 'A Product Launch & Growth Checklist',
  intro: 'Customers want to be attracted, to know that a brand cares about.',
  category: Service.Personalization,
  date: new Date(Date.now()).toString(),
  views: 34,
  graphic: 'conversion-optimization-1',
  socialMedia,
  authors,
  image: 'https://a.storyblok.com/f/98632/1680x480/56c5f56505/dummy.jpg',
};
