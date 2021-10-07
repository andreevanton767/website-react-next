import React from 'react';

import YMenuToggle from '@/components/YMenuToggle';
import YAnimateItem from '@/components/AnimateComponents/YAnimateItem';
import YLink from '@/components/YLink';
import YText from '@/components/YText';
import YImage from '@/components/YImage';

import { LayoutType, ToggleType } from '@/enums/components';
import { ScreenSize } from '@/enums/screenSize';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import useBreakpoint from '@/hooks/useBreakpoint';

export interface SubItemInterface {
  icon: {
    filename: string;
    alt?: string;
    title?: string;
  };
  text: string;
  link: string;
}

interface Props extends SubItemInterface {
  className?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  fade?: boolean;
  headerType?: LayoutType;
}

const SubItem: React.FC<Props> = ({
  icon,
  text,
  link,
  className,
  fade,
  headerType = LayoutType.Website,
  onClick = () => {},
}) => {
  const { screenSize } = useBreakpoint();

  const iconBox = (
    <div className={getIconBoxClasses(headerType)}>
      <YImage {...icon} width={145} height={90} />
    </div>
  );

  const motionProps = {
    animate: fade ? 'fade' : 'regular',
    variants: {
      regular: { opacity: 1 },
      fade: {
        opacity: 0.1,
      },
    },
  };

  return (
    <YLink href={link}>
      <YAnimateItem {...motionProps} as="a">
        <div
          onClick={onClick}
          className={[...containerClasses, className].join(' ')}
        >
          {screenSize == ScreenSize.LG ? (
            iconBox
          ) : (
            <YMenuToggle
              type={ToggleType.Plus}
              className="inline-block transform translate-y-0.5"
            />
          )}
          <YText
            className={getTextClasses(headerType)}
            fontSize={FontSize.XS}
            lineHeight={FontLineHeight.Relaxed}
            fontWeight={FontWeight.SemiBold}
            as="p"
          >
            {text}
          </YText>
        </div>
      </YAnimateItem>
    </YLink>
  );
};

// container classes
const containerClasses = [
  'relative',
  'cursor-pointer',
  'lg:h-32.5',
  'lg:w-40',
  'lg:mt-7',
  'lg:mb-5.5',
  'lg:inline-block',
  'select-none',
];

// icon box classes
const iconBoxBaseClasses = [
  'w-full',
  'h-25',
  'bg-opacity-40',
  'rounded-lg',
  'flex',
  'items-center',
  'justify-center',
];

const iconBoxAdditionalClasses = {
  [LayoutType.Website]: ['bg-blue-250'],
  [LayoutType.Blog]: ['bg-black'],
};

const getIconBoxClasses = (headerType: LayoutType) =>
  [...iconBoxBaseClasses, ...iconBoxAdditionalClasses[headerType]].join(' ');

// text classes
const textBaseClasses = [
  'text-gray-300',
  'inline-block',
  'ml-4',
  'lg:absolute',
  'lg:ml-0',
  'lg:bottom-0',
  'lg:left-1/2',
  'lg:transform',
  'lg:-translate-x-1/2',
  'lg:text-xxs',
  'lg:leading-4',
];

const getTextClasses = (headerType: LayoutType) =>
  [
    ...textBaseClasses,
    headerType === LayoutType.Blog ? 'lg:text-blog-gray-200' : '',
  ]
    .join(' ')
    .trim();

export default SubItem;
