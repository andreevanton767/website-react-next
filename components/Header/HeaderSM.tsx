import React, { useMemo, useRef, useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import dynamic from 'next/dynamic';

import YHeaderItem, {
  NavItemInterface,
} from '@/components/YHeaderItem/YHeaderItem';
import YHeaderSubItem from '@/components/YHeaderSubItem/YHeaderSubItem';

import YMenuToggle from '@/components/YMenuToggle';
import YExpandableRegion from '@/components/AnimateComponents/YExpandableRegion';
import YAnimateBackground from '@/components/AnimateComponents/YAnimateBackground';
import YLink from '@/components/YLink';
import YButton from '@/components/YButton';
import SearchButton from './SearchButton';

import useClickOutside from '@/hooks/useClickOutside';
import usePrefetch from '@/hooks/usePrefetch';

import {
  ButtonSize,
  ButtonShape,
  LayoutType,
  ToggleStyle,
} from '@/enums/components';
import { Language } from '@/enums/language';

import serviceImages from '@/components/ServiceTop/placeholderImages';

interface Logo {
  icon: string;
  link: string;
}

interface Button {
  text: string;
  link: string;
}

export interface HeaderProps {
  logo: Logo;
  navItems: NavItemInterface[];
  buttonProps: Button;
  showMoreLabel?: string;
  searchLabel: string;
  locales?: Language[];
  headerType: LayoutType;
}

const HeaderSM: React.FC<HeaderProps> = ({
  logo,
  navItems,
  buttonProps,
  headerType,
}) => {
  // control opening and closing of header
  const [showItems, setShowItems] = useState(false);

  const open = showItems;

  const headerRef = useRef(null);
  useClickOutside(headerRef, () => {
    setShowItems(false);
  });

  // top bar region
  const additionalComponents = (
    <YMenuToggle
      className={[...menuItemClasses, 'left-4'].join(' ')}
      onClick={() => {
        setShowItems(!showItems);
      }}
      open={open}
      toggleStyle={
        headerType === LayoutType.Website ? ToggleStyle.Light : ToggleStyle.Dark
      }
    />
  );

  // expandable region
  const hiddenRegion = navItems.map((item, index) => (
    <YHeaderItem
      onClick={item.subItems ? undefined : () => setShowItems(false)}
      key={item.text}
      {...item}
      className={index != 0 ? 'border-t' : ''}
    >
      {item.subItems?.map((subItem, index) => (
        <YHeaderSubItem
          onClick={() => setShowItems(false)}
          {...subItem}
          key={subItem.text}
          className={index == 0 ? 'pt-1 pb-2.5' : 'py-2.5'}
        />
      ))}
    </YHeaderItem>
  ));

  const LogoIcon = useMemo(
    () =>
      dynamic(() => import(`@/assets/icons/${logo.icon}.svg`), {
        ssr: false,
      }),
    []
  );

  // prefetch service top icons for service pages
  usePrefetch(Object.values(serviceImages));

  // button (contact us for website, search for blog)
  const contactButton = (
    <YLink href={buttonProps.link}>
      <YButton
        buttonSize={ButtonSize.XS}
        shape={ButtonShape.Round}
        className={[...menuItemClasses, 'right-4', 'whitespace-nowrap'].join(
          ' '
        )}
      >
        {buttonProps.text.split(' ')[0]}
      </YButton>
    </YLink>
  );

  const searchButton = (
    <YLink href="blog/search">
      <SearchButton
        aria-label="search button"
        className={[...menuItemClasses, 'w-6.5', 'h-6.5', 'right-5'].join(' ')}
      ></SearchButton>
    </YLink>
  );

  const button =
    headerType === LayoutType.Website ? contactButton : searchButton;

  return (
    <YAnimateBackground
      ref={headerRef}
      className="fixed w-full left-0 top-0 max-h-screen z-40 overflow-y-auto lg:hidden"
      open={open}
      {...getBackgroundClasses(headerType)}
      as="header"
    >
      <div className="h-15.5 container px-0 border-soft">
        <div className="relative w-full h-full">
          <div
            className={[...menuItemClasses, 'left-1/2 -translate-x-1/2'].join(
              ' '
            )}
          >
            <YLink href={logo.link}>
              <a
                className={[
                  'cursor-pointer',
                  headerType === LayoutType.Blog
                    ? 'fill-current text-primary'
                    : '',
                ].join(' ')}
                aria-label="YEA logo"
              >
                <LogoIcon />
              </a>
            </YLink>
          </div>
          {additionalComponents}
          {button}
        </div>
      </div>
      <AnimateSharedLayout>
        <YExpandableRegion
          className="flex flex-col items-stretch container"
          open={open}
        >
          {hiddenRegion}
        </YExpandableRegion>
      </AnimateSharedLayout>
    </YAnimateBackground>
  );
};
// background classes (expandable region)
const baseClosedClasses = ['bg-opacity-80 backdrop-blur-20'];

const additionalClosedClasses = {
  [LayoutType.Website]: ['bg-blue-300'],
  [LayoutType.Blog]: ['bg-white'],
};

const getBackgroundClasses = (headerType: LayoutType) => ({
  openClasses: 'bg-blue-400',
  closedClasses: [
    ...baseClosedClasses,
    ...additionalClosedClasses[headerType],
  ].join(' '),
});

// manu item classes
const menuItemClasses = [
  'absolute',
  'top-1/2',
  'transform',
  '-translate-y-1/2',
];

export default HeaderSM;
