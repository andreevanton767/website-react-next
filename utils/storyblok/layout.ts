import { Language } from '@/enums/language';

import {
  FooterBlokProps,
  HeaderBlokProps,
  PostLayoutRes,
  PostLayoutProps,
} from '@/types/layout';

import { HeaderProps } from '@/components/Header';
import { FooterProps } from '@/components/Footer';

/**
 * Maps PostLayoutItem props from Storyblok to client app friendly structures
 * @param PostlayoutItem
 * @returns
 */
export const mapPostLayoutProps = (
  PostlayoutItem: PostLayoutRes['PostlayoutItem']
): PostLayoutProps => {
  const {
    contentsLabel,
    postSliderTitle,
    shareLabel,
    socialLinks,
    moreArticlesLabel,
  } = PostlayoutItem.content;

  const topLayoutProps = {
    socialMedia: {
      shareLabel,
      links: socialLinks.map(({ link, ...rest }) => ({
        ...rest,
        link: link.cached_url,
      })),
    },
  };

  const bodyLayoutProps = {
    contentsLabel,
  };

  const sliderLayoutProps = {
    title: postSliderTitle,
    moreArticlesLabel,
  };

  return {
    topLayoutProps,
    bodyLayoutProps,
    sliderLayoutProps,
  };
};

/**
 * Maps header props from header SbBlok to Header component props
 * @param param0 HeaderBlokProps
 * @returns HeaderProps
 */
export const mapHeaderProps = (
  {
    content: {
      logoIcon,
      logoLink,
      buttonLink,
      buttonText,
      navItems,
      searchLabel,
      headerType,
    },
  }: HeaderBlokProps,
  languageCodes?: Language[]
): HeaderProps => ({
  headerType,
  searchLabel,
  logo: { icon: logoIcon, link: logoLink.cached_url },
  buttonProps: { link: buttonLink.cached_url, text: buttonText },
  locales: languageCodes || [],
  navItems: navItems?.map(({ link, subItems, text }) => {
    const baseProps = {
      text,
      link: link?.cached_url,
    };

    const subItemsAdditional = subItems.length
      ? {
          subItems:
            subItems?.map(({ link, ...subItem }) => ({
              ...subItem,
              link: link.cached_url,
            })) || undefined,
        }
      : {};

    return {
      ...baseProps,
      ...subItemsAdditional,
    };
  }),
});

/**
 * Maps footer props from header SbBlok to Footer component props
 * @param param0 FooterBlokProps
 * @returns FooterProps
 */
export const mapFooterProps = (
  {
    content: {
      contentDescription,
      contentHeading,
      contactButton,
      linksFirst,
      linksSecond,
      socialMedia,
      phoneLabel,
      phoneValue,
      searchLabel,
      footerType,
      ...contact
    },
  }: FooterBlokProps,
  languageCodes: Language[]
): FooterProps => ({
  footerType,
  searchLabel,
  locales: languageCodes,
  content: { description: contentDescription, heading: contentHeading },
  contactButton,
  links: {
    first: linksFirst?.map(({ link, ...rest }) => ({
      ...rest,
      link: link.cached_url,
    })),
    second: linksSecond?.map(({ link, ...rest }) => ({
      ...rest,
      link: link.cached_url,
    })),
  },
  socialMedia: socialMedia?.map(({ link, ...rest }) => ({
    ...rest,
    link: link.cached_url,
  })),
  contactDetails: {
    ...contact,
    phoneNumber: { label: phoneLabel, value: phoneValue },
  },
});
