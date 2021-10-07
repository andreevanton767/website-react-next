import React from 'react';

import { ServiceButton } from '@/enums/components';
import { ScreenSize } from '@/enums/screenSize';

import YInputButton from '@/components/YInputButton';
import YButton from '@/components/YButton';
import YLink from '@/components/YLink';
import YConditionalWrapper from '@/components/YConditionalWrapper';
import useBreakpoint from '@/hooks/useBreakpoint';

export interface ButtonProps {
  text: string;
  link: string;
  type?: ServiceButton;
  placeholder?: string;
}

const YServiceButton: React.FC<
  ButtonProps & {
    sectionRef: React.MutableRefObject<HTMLElement>;
    className?: string;
  }
> = ({ type, text, placeholder, link, sectionRef, className }) => {
  const { screenSize } = useBreakpoint();

  const handleScroll = () => {
    const { height } = sectionRef.current.getBoundingClientRect();
    const smHeaderHeight = 62;

    // on smaller screens, offset scroll to by fixed header
    const top = screenSize == ScreenSize.LG ? height : height - smHeaderHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // applied only if there's no link present for ServiceButton.Button
  const additinalButtonProps = link
    ? {}
    : {
        onPress: handleScroll,
      };

  const button =
    type == ServiceButton.Input ? (
      <YInputButton
        buttonText={text}
        placeholder={placeholder}
        className={['max-w-full', className].join(' ')}
      />
    ) : (
      <YButton
        shadow
        className={[
          'px-5 py-3 text-sm leading-6 lg:text-md lg:leading-7',
          className,
        ].join(' ')}
        {...additinalButtonProps}
      >
        {text}
      </YButton>
    );

  // wrapper to be used with YConditionalWrapper
  const wrapperElement = ({ children }: { children: React.ReactNode }) => (
    <YLink href={link}>{children}</YLink>
  );

  return (
    <YConditionalWrapper
      condition={Boolean(type != ServiceButton.Input && link)}
      wrapper={wrapperElement}
    >
      {button}
    </YConditionalWrapper>
  );
};

export default YServiceButton;
