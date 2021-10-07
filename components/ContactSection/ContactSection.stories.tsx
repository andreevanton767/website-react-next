import ContactSection from './ContactSection';

import { props } from './storiesData';

export default {
  title: 'Contact Section',
  component: ContactSection,
  backgroundImage: {
    filename:
      'https://a.storyblok.com/f/98632/1680x1000/2fc0a98fd9/contact-cover.jpg',
  },
};

export const Default = (): JSX.Element => <ContactSection {...props} />;
