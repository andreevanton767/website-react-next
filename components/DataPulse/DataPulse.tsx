import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { ButtonShape } from '@/enums/components';

import YHeading from '@/components/YHeading';
import YText from '@/components/YText';
import YLink from '@/components/YLink';
import YButton from '@/components/YButton';

import { BackgroundProps } from './Background';

interface ButtonProps {
  text: string;
  link: string;
}

interface Props extends BackgroundProps {
  title: string;
  description: string;
  buttonProps: ButtonProps;
}

const DataPulse: React.FC<Props> = ({
  title,
  description,
  buttonProps,
  cards,
}) => {
  const [loadDynamic, setLoadDynamic] = useState(false);

  useEffect(() => {
    setLoadDynamic(true);
  }, []);

  const Background = useMemo(
    () => dynamic(() => import('./Background'), { ssr: false }),
    []
  );

  return (
    <>
      <div className="relative w-full overflow-hidden lg:h-210">
        <div className="container relative h-full pb-10 pt-111.1 lg:pt-0 lg:px-0">
          {loadDynamic && <Background cards={cards} />}
          <div className="relative z-10 w-full text-center lg:text-left lg:top-45 lg:w-97.5">
            <YHeading
              className="text-white mb-3 lg:text-3xl lg:leading-18 lg:font-bold"
              fontSize={FontSize.XL}
              fontWeight={FontWeight.ExtraBold}
              as="h1"
            >
              {title}
            </YHeading>
            <YText
              fontSize={FontSize.SM}
              lineHeight={FontLineHeight.Relaxed}
              className="text-gray-300 mb-4 max-w-md mx-auto lg:mb-5 lg:text-base lg:leading-11"
              as="p"
            >
              {description}
            </YText>
            <YLink href={buttonProps.link}>
              <YButton
                className="px-4.5 py-2.5 text-xs leading-5 lg:px-5 lg:py-3 lg:text-sm lg:leading-6"
                shape={ButtonShape.Round}
                shadow
              >
                {buttonProps.text}
              </YButton>
            </YLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataPulse;
