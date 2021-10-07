import { HTMLAttributes, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Language } from '@/enums/language';
import {
  ButtonShape,
  ButtonSize,
  LayoutType,
  SearchButtonSize,
} from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YLink from '@/components/YLink';
import YText from '@/components/YText';
import YHeading from '@/components/YHeading';
import YButton from '@/components/YButton';
import YSelect from '@/components/YSelect';
import YSearchField from '@/components/YSearchField';

import MainLogo from '@/assets/icons/logo-main.svg';

type SocialPlatform = {
  icon: string;
  link: string;
  name: string;
};

type Link = {
  text: string;
  link: string;
  target?: string;
};

interface ContactDetails {
  street: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: {
    label: string;
    value: string;
  };
}

interface FooterContent {
  heading: string;
  description: string;
}

export interface FooterProps {
  links: {
    first: Link[];
    second: Link[];
  };
  contactDetails: ContactDetails;
  content: FooterContent;
  socialMedia: SocialPlatform[];
  contactButton: string;
  footerType: LayoutType;
  locales?: Language[];
  searchLabel: string;
}

type Props = FooterProps & HTMLAttributes<HTMLElement>;

function Footer({
  links = { first: [], second: [] },
  contactDetails,
  content,
  socialMedia,
  contactButton,
  footerType,
  locales,
  searchLabel,
  ...props
}: Props): JSX.Element {
  const { first: firstLinks, second: secondLinks } = links;

  // handle search field submit
  const router = useRouter();

  const handleSearch = (value: string) => {
    const pushPath = `/blog/search?search=${value}`;

    router.push(pushPath);
  };

  return (
    <footer className="relative py-20 pb-18 z-10" {...props}>
      <div className="container flex flex-wrap lg:px-0">
        {renderLogoSm(footerType)}
        <div className="flex-wrap hidden md:block">
          {renderLogoLg(footerType)}
          {renderFooterContent(content, contactButton, footerType)}
        </div>
        <div
          className={[
            'flex-1 md:flex-none',
            footerType === LayoutType.Website ? 'md:ml-43' : 'md:ml-32',
          ].join(' ')}
        >
          <ul>
            {firstLinks.map((link: Link) => renderListItem(link, footerType))}
          </ul>
        </div>
        <div
          className={[
            'flex-1 md:flex md:flex-wrap',
            footerType === LayoutType.Website ? 'md:ml-25' : 'md:ml-12.5',
          ].join(' ')}
        >
          <ul className="block mb-5.5 md:flex-1">
            {secondLinks.map((link: Link) => renderListItem(link, footerType))}
          </ul>
          {renderContact(
            contactDetails,
            socialMedia,
            contactButton,
            footerType
          )}
        </div>
        {renderSearchSection(searchLabel, locales, footerType, handleSearch)}
      </div>
    </footer>
  );
}

// YEA logo displayed on screen sm
const renderLogoSm = (footerType: LayoutType) => (
  <div
    className={[
      'w-full mb-4 md:hidden',
      footerType === LayoutType.Blog ? 'fill-current text-primary' : '',
    ].join(' ')}
  >
    <MainLogo />
  </div>
);

// YEA logo displayed on screen lg
const renderLogoLg = (footerType: LayoutType): JSX.Element => {
  const baseClasses = ['w-full', 'mb-4', 'md:mb-10'];

  return (
    <div
      className={[
        ...baseClasses,
        footerType == LayoutType.Blog ? 'fill-current text-primary' : '',
      ].join(' ')}
    >
      <MainLogo />
    </div>
  );
};

// footer content, displayed only on website header
const renderFooterContent = (
  content: FooterContent,
  contactButton: string,
  footerType: LayoutType
) =>
  footerType === LayoutType.Website && (
    <div className="w-64">
      <YHeading
        fontSize={FontSize.LG}
        fontWeight={FontWeight.ExtraBold}
        className="mb-3 w-full block text-gray-400"
        dangerouslySetInnerHTML={{
          __html: content.heading,
        }}
      />
      <YText
        fontSize={FontSize.XXS}
        fontWeight={FontWeight.SemiBold}
        lineHeight={FontLineHeight.Loose}
        className="mb-3 block w-full text-gray-300"
      >
        {content.description}
      </YText>
      <YButton buttonSize={ButtonSize.XS} shape={ButtonShape.Round}>
        {contactButton}
      </YButton>
    </div>
  );

// link items
const renderListItem = (link: Link, footerType: LayoutType) => {
  const textColor =
    footerType === LayoutType.Website ? 'text-gray-500' : 'text-blog-gray-150';

  return (
    <li key={link.link} className={['mb-3', textColor].join(' ')}>
      <YLink href={link.link}>
        <a>
          <YText
            fontSize={FontSize.XXS}
            fontWeight={FontWeight.SemiBold}
            lineHeight={FontLineHeight.Loose}
          >
            {link.text}
          </YText>
        </a>
      </YLink>
    </li>
  );
};

// contect section
const renderContact = (
  contactDetails: ContactDetails,
  socialMedia: SocialPlatform[],
  contactButton: string,
  footerType: LayoutType
) => {
  const containerClasses = [
    'md:flex-1',
    ...(footerType === LayoutType.Website
      ? ['text-gray-300', 'md:ml-25']
      : ['text-blog-gray-100', 'md:ml-12.5']),
  ].join(' ');

  const phoneColor =
    footerType === LayoutType.Website ? 'text-white' : 'text-blog-gray-100';

  return (
    <div className={containerClasses}>
      <YText
        as="div"
        fontSize={FontSize.XXS}
        fontWeight={FontWeight.SemiBold}
        lineHeight={FontLineHeight.Relaxed}
        className="mb-4 mt-2.5 md:mt-0"
        aria-label="contact adress"
      >
        {contactDetails.street}
        <br />
        {contactDetails.postalCode} {contactDetails.city}
      </YText>
      <YText
        as="a"
        href={`tel:${contactDetails.phoneNumber.value}`}
        fontSize={FontSize.XXS}
        fontWeight={FontWeight.SemiBold}
        lineHeight={FontLineHeight.Tight}
        className={['block mb-10 md:mb-4', phoneColor].join(' ')}
        aria-label="phone number"
      >
        {contactDetails.phoneNumber.label}
      </YText>
      <div className="flex mb-10 md:mb-0">
        {socialMedia.map((platform) => {
          const Icon = useMemo(
            () => require(`@/assets/icons/${platform.icon}.svg`).default,
            []
          );

          const color =
            footerType === LayoutType.Website
              ? 'text-gray-500'
              : 'text-blog-gray-200';

          return (
            <div
              key={platform.link}
              className={['svg-fit fill-current w-4.5 h-4.5 mr-5', color].join(
                ' '
              )}
            >
              <a
                href={platform.link}
                aria-label={`${platform.name} page`}
                target="_blank"
                rel="noreferrer"
              >
                <Icon />
              </a>
            </div>
          );
        })}
      </div>
      {footerType === LayoutType.Website && (
        <YButton
          buttonSize={ButtonSize.XS}
          shape={ButtonShape.Round}
          className="px-4 md:hidden"
        >
          {contactButton}
        </YButton>
      )}
    </div>
  );
};

const renderSearchSection = (
  searchLabel: string,
  locales: Language[],
  footerType: LayoutType,
  onSearch: Parameters<typeof YSearchField>[0]['onSubmit']
) => {
  const searchBarClasses = [
    'w-43',
    'h-10',
    'ml-6',
    'py-3',
    'px-5.5',
    'flex-shrink-0',
  ].join(' ');

  return footerType === LayoutType.Blog ? (
    <div className="hidden md:flex-1 lg:block items-start ml-12.5 ">
      <div className="flex items-center flex-wrap justify-self-end justify-end">
        <YSelect locales={locales} className="text-blog-gray-200" />
        <YSearchField
          aria-label="footer search field"
          className={searchBarClasses}
          searchButtonSize={SearchButtonSize.SM}
          placeholder={searchLabel}
          onSubmit={onSearch}
          autoSubmit={false}
        />
      </div>
    </div>
  ) : null;
};

export default Footer;
