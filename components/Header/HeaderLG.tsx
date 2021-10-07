import React, { useMemo, useRef, useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import dynamic from 'next/dynamic';

import YHeaderItem, {
  NavItemInterface,
} from '@/components/YHeaderItem/YHeaderItem';
import YHeaderSubItem, {
  SubItemInterface,
} from '@/components/YHeaderSubItem/YHeaderSubItem';

import YExpandableRegion from '@/components/AnimateComponents/YExpandableRegion';
import YAnimateBackground from '@/components/AnimateComponents/YAnimateBackground';
import YSlider from '@/components/YSlider';
import YLink from '@/components/YLink';
import YButton from '@/components/YButton';
import YSelect from '@/components/YSelect';
import YSearchField from '@/components/YSearchField';

import useClickOutside from '@/hooks/useClickOutside';
import usePrefetch from '@/hooks/usePrefetch';

import {
  ButtonSize,
  ButtonShape,
  ArrowType,
  LayoutType,
  SearchButtonSize,
} from '@/enums/components';
import { Language } from '@/enums/language';

import serviceImages from '@/components/ServiceTop/placeholderImages';
import { useRouter } from 'next/router';

interface Logo {
  icon: string;
  link: string;
}

interface Button {
  text: string;
  link: string;
}

interface Props {
  logo: Logo;
  navItems: NavItemInterface[];
  buttonProps: Button;
  showMoreLabel?: string;
  searchLabel: string;
  locales?: Language[];
  headerType: LayoutType;
}

const HeaderLG: React.FC<Props> = ({
  logo,
  navItems,
  buttonProps,
  showMoreLabel,
  locales,
  headerType = LayoutType.Website,
  searchLabel,
}) => {
  // control opening and closing of header
  const [subItems, setSubItems] = useState<SubItemInterface[] | null>(null);

  const open = Boolean(subItems);

  const headerRef = useRef(null);
  useClickOutside(headerRef, () => {
    setSubItems(null);
  });

  // prefetch icons in hidden region (sub items)
  const iconWidth = 145;
  const iconHeight = 90;

  const iconsToPrefetch = navItems.reduce(
    (
      acc: { filename: string; width: number; height: number }[],
      { subItems }: NavItemInterface
    ) => {
      const curr = subItems
        ? subItems.map(({ icon: { filename } }) => ({
            filename,
            width: iconWidth,
            height: iconHeight,
          }))
        : [];
      acc = [...acc, ...curr];
      return acc;
    },
    []
  );

  // prefetch header icons
  usePrefetch(iconsToPrefetch);

  // prefetch service top icons for service pages
  usePrefetch(Object.values(serviceImages));

  // top bar region
  const additionalComponents = (
    <>
      <div className="w-full mx-20 flex items-center justify-start">
        {navItems.map((item) => (
          <YHeaderItem
            key={item.text}
            {...item}
            headerType={headerType}
            onClick={() => setSubItems(subItems ? null : item.subItems)}
            disableMount
          />
        ))}
      </div>
      <YSelect
        className={[
          'mr-6',
          headerType === LayoutType.Website
            ? 'text-white'
            : 'text-blog-gray-200',
        ].join(' ')}
        locales={locales}
      />
    </>
  );

  // Contact us button or search bar
  const button = (
    <YLink href={buttonProps.link}>
      <YButton
        buttonSize={ButtonSize.XS}
        shape={ButtonShape.Round}
        className={[...menuItemClasses, 'right-0', 'whitespace-nowrap'].join(
          ' '
        )}
      >
        {buttonProps.text}
      </YButton>
    </YLink>
  );

  // handle search field submit
  const router = useRouter();

  const handleSearch = (value: string) => {
    const pushPath = `/blog/search?search=${value}`;

    router.push(pushPath);
  };

  const searchBarProps = {
    className: [
      ...menuItemClasses,
      'w-43',
      'h-10',
      'py-3',
      'px-5.5',
      'flex-shrink-0',
    ].join(' '),
    onSubmit: handleSearch,
    placeholder: searchLabel,
    searchButtonSize: SearchButtonSize.SM,
    autoSubmit: false,
    'aria-label': 'header search bar',
  };

  const searchBar = <YSearchField {...searchBarProps} />;

  const actionElement = headerType === LayoutType.Website ? button : searchBar;

  // expandable region
  const hiddenRegion = (
    <>
      <YSlider
        className="relative whitespace-nowrap overflow-hidden"
        showMoreLabel={showMoreLabel}
      >
        {({ position }) => (
          <>
            {subItems?.map((subItem, index) => (
              <YHeaderSubItem
                headerType={headerType}
                onClick={() => setSubItems(null)}
                {...subItem}
                key={subItem.text}
                className={index < subItems.length - 1 ? 'mr-5' : ''}
                fade={
                  (position == ArrowType.Right &&
                    index < subItems.length - 5) ||
                  (position == ArrowType.Left && index > 4)
                }
              />
            ))}
          </>
        )}
      </YSlider>
      <div className="absolute top-full width-full h-0 border-soft border-b" />
    </>
  );

  const LogoIcon = useMemo(
    () =>
      dynamic(() => import(`@/assets/icons/${logo.icon}.svg`), {
        ssr: false,
      }),
    []
  );

  return (
    <YAnimateBackground
      ref={headerRef}
      open={open}
      {...getBackgroundStyleProps(headerType)}
      as="header"
    >
      <div className="container px-0 h-23.5 border-soft">
        <div className="relative w-full h-8.5 top-1/2 flex items-center">
          <div
            className={[
              ...menuItemClasses,
              'left-0 translate-x-0 inline-block',
            ].join(' ')}
          >
            <YLink href={logo.link}>
              <a
                className={[
                  'cursor-pointer',
                  headerType === LayoutType.Blog
                    ? 'fill-current text-primary'
                    : '',
                ]
                  .join(' ')
                  .trim()}
                aria-label="YEA logo"
              >
                <LogoIcon />
              </a>
            </YLink>
          </div>
          {additionalComponents}
          {actionElement}
        </div>
      </div>
      <AnimateSharedLayout>
        <YExpandableRegion
          className="flex flex-col items-stretch container"
          open={open}
          height={181}
        >
          {hiddenRegion}
        </YExpandableRegion>
      </AnimateSharedLayout>
    </YAnimateBackground>
  );
};

const menuItemClasses = [
  'relative',
  'top-1/2',
  'transform',
  '-translate-y-1/2',
];

// header animated background classes
const backgroundBaseClasses = [
  'absolute',
  'z-40',
  'hidden',
  'top-0',
  'lg:block',
];

const backgroundAdditionalClasses = {
  [LayoutType.Website]: ['w-full', 'left-0'],
  [LayoutType.Blog]: ['w-280', 'left-1/2', 'transform', '-translate-x-1/2'],
};

const backgroundOpenClasses = {
  [LayoutType.Website]: ['bg-blue-header', 'backdrop-blur-60', 'bg-opacity-70'],
  [LayoutType.Blog]: [
    'bg-blog-gray-400',
    'backdrop-blur-80',
    'shadow-blog-header',
    'bg-opacity-70',
  ],
};

const getBackgroundStyleProps = (headerType: LayoutType) => ({
  className: [
    ...backgroundBaseClasses,
    ...backgroundAdditionalClasses[headerType],
  ].join(' '),
  openClasses: backgroundOpenClasses[headerType].join(' '),
});

export default HeaderLG;
