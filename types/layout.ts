import { LayoutType } from '@/enums/components';

import { Blok, SbImage, SbLink } from '@/types/storyblok';
import { PostPageProps } from '@/types/blogPost';

import { GlobalStateStore } from '@/types/globalState';

//region components
type SubItemBlok = Blok<{
  icon: SbImage;
  link: SbLink;
  text: string;
}>;

type NavItemBlok = Blok<{
  link: SbLink;
  text: string;
  subItems?: SubItemBlok[];
}>;

export type SocialPlatformBlok = Blok<{
  icon: string;
  link: SbLink;
  name: string;
}>;

export interface HeaderBlokProps {
  content: Blok<{
    logoIcon: string;
    logoLink: SbLink;
    navItems: NavItemBlok[];
    buttonLink?: SbLink;
    buttonText?: string;
    searchLabel: string;
    headerType: LayoutType;
  }>;
}

type FooterLinkBlok = Blok<{
  link: SbLink;
  text: string;
}>;

export interface FooterBlokProps {
  content: Blok<{
    city: string;
    email: string;
    street: string;
    phoneLabel: string;
    phoneValue: string;
    postalCode: string;
    linksFirst: FooterLinkBlok[];
    linksSecond: FooterLinkBlok[];
    socialMedia: SocialPlatformBlok[];
    contactButton: string;
    contentHeading: string;
    contentDescription: string;
    searchLabel: string;
    footerType: LayoutType;
  }>;
}

export type LayoutProps = Pick<GlobalStateStore, 'header'> &
  Pick<GlobalStateStore, 'footer'> &
  Pick<GlobalStateStore, 'editableContent'> &
  Pick<GlobalStateStore, 'metaContent'>;
//endregion

//region post layout
export interface PostLayoutRes {
  PostlayoutItem: {
    content: Blok<{
      header: HeaderBlokProps;
      contentsLabel: string;
      shareLabel: string;
      socialLinks: SocialPlatformBlok[];
      postSliderTitle: string;
      moreArticlesLabel: string;
      footer: FooterBlokProps;
    }>;
  };
}

type TopLayoutProps = { socialMedia: PostPageProps['topProps']['socialMedia'] };
type BodyLayoutProps = {
  contentsLabel: PostPageProps['bodyProps']['contentsLabel'];
};
type SliderLayoutProps = {
  title: PostPageProps['sliderProps']['title'];
  moreArticlesLabel: PostPageProps['sliderProps']['moreArticlesLabel'];
};

export interface PostLayoutProps {
  topLayoutProps: TopLayoutProps;
  bodyLayoutProps: BodyLayoutProps;
  sliderLayoutProps: SliderLayoutProps;
}
//endregion
