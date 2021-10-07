import React from 'react';

import YServiceButton from '@/components/YServiceButton';

import User from '@/assets/icons/user.svg';
import Sale from '@/assets/icons/sale.svg';
import Email from '@/assets/icons/email.svg';
import UserVoice from '@/assets/icons/user-voice.svg';
import Analise from '@/assets/icons/analise.svg';
import Mobile from '@/assets/icons/mobile.svg';
import Megaphone from '@/assets/icons/megaphone.svg';
import Code from '@/assets/icons/code.svg';

const Cloud: React.FC = () => {
  const boxes = (
    <>
      <Box className="svg-fit left-12.5 top-0 text-primary md:border-none md:text-blue-100 md:bg-blue-350">
        <UserVoice />
      </Box>
      <Box className="svg-fit left-42.1 top-14.1">
        <Code />
      </Box>
      <Box className="svg-fit left-76.6 top-5.5 md:bg-primary md:bg-opacity-30 md:border-none">
        <Email />
      </Box>
      <Box className="svg-fit left-100 top-43 blur-3 text-primary">
        <UserVoice />
      </Box>
      <Box className="svg-fit top-35 right-31.1 border-primary text-primary md:border-none md:bg-blue-350">
        <Sale />
      </Box>
      <Box className="svg-fit left-0 top-61.6 blur-5">
        <User />
      </Box>
      <Box className="svg-fit left-12 bottom-21.6 text-primary md:text-blue-100 md:border-none md:bg-blue-350">
        <Mobile />
      </Box>
      <Box className="svg-fit bottom-26 right-20 blur-3 text-primary border-primary md:right-2.5">
        <Megaphone />
      </Box>
      <Box className="svg-fit bottom-5 right-28.5 text-primary md:bg-primary md:bg-opacity-30 md:border-none">
        <Analise />
      </Box>
    </>
  );

  const servicesButtons = (
    <>
      <YServiceButton
        className="svg-fit absolute w-65 left-110 top-13 md:border-blue-100 md:text-blue-100"
        icon="analytics"
        title="Data & Analitics"
        interactive={false}
      />
      <YServiceButton
        className="svg-fit absolute w-65 left-22.5 top-37.5 text-white border-primary"
        icon="user"
        title="Personalization"
        interactive={false}
        active
        iconGreen
      />
      <YServiceButton
        className="svg-fit absolute w-65 left-37.5 bottom-48.5 blur-3"
        icon="email"
        title="E-mail marketing"
        interactive={false}
      />
      <YServiceButton
        className="svg-fit absolute w-65 top-58.5 right-0 md:border-primary md:text-white"
        icon="user-voice"
        title="Affiliate Marketing"
        interactive={false}
        active
        iconGreen
      />
      <YServiceButton
        className="svg-fit absolute w-65 left-70 bottom-25 md:border-blue-100 md:text-blue-100"
        icon="email"
        title="E-mail marketing"
        interactive={false}
      />
      <YServiceButton
        className="svg-fit absolute w-70 left-43.6 bottom-0 blur-3"
        icon="megaphone"
        title="Social media advertising"
        interactive={false}
        iconGreen
      />
      <YServiceButton
        className="svg-fit absolute w-70 -left-35 -bottom-20 blur-3 md:hidden"
        icon="megaphone"
        title="Social media advertising"
        interactive={false}
        iconGreen
      />
    </>
  );

  return (
    <div className={containerClasses.join(' ')}>
      {boxes}
      {servicesButtons}
    </div>
  );
};

const containerClasses = [
  'absolute',
  'text-white-40',
  'select-none',
  'cursor-normal',
  'h-130.1',
  'w-185.1',
  '-top-12.5',
  'left-1/2',
  'transform',
  'scale-65',
  '-translate-x-1/2',
  'md:left-100',
  'md:top-1/2',
  'md:-translate-y-1/2',
  'md:translate-x-0',
  'md:scale-100',
];

const Box: React.FC<{ className?: string }> = ({ className, children }) => (
  <div className={[...boxClasses, className].join(' ')}>{children}</div>
);

const boxClasses = [
  'absolute',
  'rounded-lg',
  'fill-current',
  'flex',
  'items-center',
  'justify-center',
  'border',
  'border-soft-white',
  'px-5',
  'py-4',
  'h-15',
  'w-16.6',
];

export default Cloud;
