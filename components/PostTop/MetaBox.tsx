import { FontSize, FontWeight } from '@/enums/font';
import { ScreenSize } from '@/enums/screenSize';
import { SbImage } from '@/types/storyblok';
import React, { useMemo } from 'react';
import YHeading from '../YHeading';
import YImage from '../YImage';
import YOutLink from '../YOutLink';
import YText from '../YText';

type SocialPlatform = {
  icon: string;
  link: string;
  name: string;
};

interface Author {
  name: string;
  image?: SbImage;
  role?: string;
  title?: string;
  interests?: string;
}

export interface MetaBoxProps {
  socialMedia?: { shareLabel: string; links?: SocialPlatform[] };
  authors?: Author[];
  className?: string;
}

const MetaBox: React.FC<MetaBoxProps> = ({
  socialMedia,
  authors,
  className,
}) => {
  const socialLinks = (
    <div className="w-full min-h-22 py-2 border-blog-gray-300 border-b sm:px-12.5 sm:py-5 lg:min-h-none lg:px-0 lg:py-0 lg:border-none">
      <YHeading
        fontSize={FontSize.MD}
        className="hidden text-blue-400 ml-2 lg:block"
      >
        {socialMedia.shareLabel}
      </YHeading>
      <div className="flex justify-center flex-wrap w-full lg:justify-start">
        {socialMedia.links?.map((args) => renderSocial(args))}
      </div>
    </div>
  );

  const authorInfo = (
    <figure className="flex justify-between w-full p-5 md:p-10 lg:flex-wrap-reverse lg:p-2">
      <figcaption className="w-80 md:w-120 lg:w-full lg:mb-5">
        {renderAuthors(authors)}
      </figcaption>
      {renderAuthorImages(authors)}
    </figure>
  );

  return (
    <div className={[...boxClasses, className].join(' ')}>
      {socialMedia && socialLinks}
      {authorInfo}
    </div>
  );
};

export default MetaBox;

// authors and social media
const boxClasses = [
  'flex',
  'flex-wrap',
  'w-full',
  'lg:flex-wrap-reverse',
  'lg:w-61.6',
  'relative',
];

/**
 * Render social media links function
 * @param param0
 * @returns
 */
const renderSocial = ({
  icon,
  link,
  name,
}: {
  icon: string;
  link: string;
  name: string;
}) => {
  const Icon = useMemo(() => require(`@/assets/icons/${icon}.svg`).default, []);

  return (
    <YOutLink
      key={name}
      className="inline-block svg-fit fill-current text-blog-gray-50 w-6 h-6 m-3 flex-shrink-0"
      aria-label={`${name} page`}
      href={link}
    >
      <Icon />
    </YOutLink>
  );
};

/**
 * Creates element for author(s) with name(s) and appropriate about info
 * @param authors array of Author entries, length 1+
 * @returns JSX.Element with name(s) element and info element
 */
const renderAuthors = (authors: Author[]) => {
  const nameString = authors.map(
    ({ name }, index) => `${index > 0 ? ' & ' : ''}${name}`
  );

  const infoEntries =
    authors.length === 1
      ? filterNameAndImage(authors[0])
      : authors.map(({ role }) => role);

  const authorInfo = infoEntries.map((entry, index) => (
    <React.Fragment key={entry}>
      {index > 0 && <br />}
      {entry}
    </React.Fragment>
  ));

  return (
    <>
      <YHeading
        fontSize={FontSize.SM}
        className="block text-blue-400 mb-2 md:text-md md:leading-9 md:mb-1"
      >
        {nameString}
      </YHeading>
      <YText
        fontSize={FontSize.XXS}
        fontWeight={FontWeight.SemiBold}
        className="block text-blog-gray-200 md:text-xs md:leading-7 md:mb-1"
      >
        {authorInfo}
      </YText>
    </>
  );
};

/**
 * Filters name and cover from author entry
 * @param author Author interface
 * @returns array of values of the rest of author info fields, if any
 */
const filterNameAndImage = ({ name, image, ...rest }: Author): string[] =>
  Object.values(rest);

/**
 * Creates elements for author(s) images and stacks them next to each other with overlap and parallax as screen shrinks
 * @param authors array of Author entries
 * @returns JSX.Element
 */
const renderAuthorImages = (authors: Author[]) => (
  <div className="flex w-full justify-end h-10 sm:ml-5 lg:justify-start lg:ml-4 lg:h-20 lg:mb-3">
    {authors.map((author, index) => (
      <div
        key={author.name}
        style={{ zIndex: authors.length - index }}
        className="relative w-full h-full max-w-7.5 xs:max-w-15"
      >
        <div className={authorImageClasses.join(' ')}>
          {author.image.filename && (
            <YImage {...getAuthorImageProps(author.image)} />
          )}
        </div>
      </div>
    ))}
  </div>
);

const getAuthorImageProps = (image: SbImage) =>
  ({
    ...image,
    width: 40,
    height: 40,
    responsive: {
      [ScreenSize.SM]: {
        height: 80,
        width: 80,
      },
    },
  } as Parameters<typeof YImage>[0]);

const authorImageClasses = [
  'absolute',
  'top-0',
  'right-0',
  'w-10',
  'h-10',
  'bg-blog-gray-50',
  'bg-opacity-50',
  'rounded-full',
  'overflow-hidden',
  'xs:h-20',
  'xs:w-20',
];
