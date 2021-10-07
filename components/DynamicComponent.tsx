import { Blok, PageItem } from '@/types/storyblok';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import HomeTop from '@/components/HomeTop';
import DataPulse from '@/components/DataPulse';
import OurServices from '@/components/OurServices';
import BenefitsOfPersonalization from '@/components/BenefitsOfPersonalization';
import MarketingAutomations from '@/components/MarketingAutomations';
import Reviews from '@/components/Reviews';

import AboutTop from '@/components/AboutTop';
import AboutDifferent from '@/components/AboutDifferent';
import AboutTeam from '@/components/AboutTeam';
import AboutContact from '@/components/AboutContact';

import ServiceTop from '@/components/ServiceTop';
import ServiceSimple from '@/components/ServiceSimple';
import ServiceSimpleImage from '@/components/ServiceSimpleImage';
import ServiceThreePoints from '@/components/ServiceThreePoints';
import ServiceFourPoints from '@/components/ServiceFourPoints';
import ServiceLatestPosts from '@/components/ServiceLatestPosts';

import ContactSection from '@/components/ContactSection';

import Placeholder from './Placeholder';

import { mapStoryblokProps } from '@/utils/storyblok';

const Components = {
  Header,
  HomeTop,
  DataPulse,
  OurServices,
  BenefitsOfPersonalization,
  MarketingAutomations,
  Reviews,
  AboutTop,
  AboutDifferent,
  AboutTeam,
  AboutContact,
  ServiceTop,
  ServiceSimple,
  ServiceSimpleImage,
  ServiceThreePoints,
  ServiceFourPoints,
  ServiceLatestPosts,
  ContactSection,
  Footer,
};

interface Props {
  blok: Blok<any>;
}

const DynamicComponent = ({ blok }: Props): JSX.Element => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component];
    return <Component {...mapStoryblokProps(blok)} />;
  }
  return <Placeholder componentName={blok.component} />;
};

export default DynamicComponent;
