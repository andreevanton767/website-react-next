import React from 'react';
import dynamic from 'next/dynamic';

import { Elapsed } from '@/enums/components';
import { FontSize, FontWeight } from '@/enums/font';

import YHeading from '@/components/YHeading';

import Line from '@/assets/other/pipeline.svg';
import Grade from '@/assets/other/pipeline-grade.svg';

import style from './Pipeline.module.css';

export interface Action {
  logo?: JSX.Element;
  action: string;
  followUp?: string;
}

const Pipeline: React.FC<{
  actions: Action[];
}> = ({ actions }) => {
  const timeline = Object.keys(actions);

  const actionElements = timeline.map((elapsed) => {
    const index = Number(elapsed);
    const { bgColor, fontColor } = getColorClasses(index);

    const Logo = dynamic(
      () => import(`@/assets/icons/${actions[index].logo}.svg`),
      { ssr: false }
    );

    return (
      <div
        key={Elapsed[index]}
        className="relative w-11.5 h-6.5 rounded-2.5xl mb-55 mr-4 px-2.5 py-1 bg-blue-100 text-center"
      >
        <YHeading
          fontSize={FontSize.XXS}
          fontWeight={FontWeight.SemiBold}
          className="text-white"
          as="p"
        >
          {Elapsed[index]}
        </YHeading>
        <div className="absolute h-0.5 w-2 bg-blue -right-6 top-1/2 transform -translate-y-1/2 translate-x-full bg-blue-100" />
        <div className="absolute h-0.5 w-2 bg-blue -right-6 top-1/2 transform -translate-y-30 translate-x-full bg-blue-100" />
        <div className="absolute -right-12.5 -top-1/2 transform translate-x-full whitespace-nowrap text-left">
          <div
            className={[
              'h-9 w-9 p-2 inline-block align-top rounded-full fill-current',
              bgColor,
              fontColor,
            ].join(' ')}
          >
            <Logo />
          </div>
          {![0, 6].includes(index) && (
            <div className={[...textboxClasses, bgColor, fontColor].join(' ')}>
              {actions[index].action}
            </div>
          )}
          {[2, 3, 4].includes(index) && (
            <div
              className={[...textboxClasses, 'text-white bg-gray-700'].join(
                ' '
              )}
            >
              {actions[index].followUp}
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div
      className={[
        'absolute top-0 right-0 pt-30 pl-10.5 pb-40',
        style.bgPipeline,
      ].join(' ')}
    >
      <div className="absolute left-26 top-0">
        <Line />
      </div>
      <div className="absolute left-28 top-0.5">
        <Grade />
      </div>
      {actionElements}
    </div>
  );
};

export default Pipeline;

const textboxClasses = [
  'w-45.6',
  'min-h-15',
  'ml-4',
  'mr-12.5',
  'p-3',
  'inline-block',
  'whitespace-normal',
  'align-top',
  'rounded-md',
  'rounded-tl-none',
];

const getColorClasses = (index: Elapsed) => {
  const bgColor = [0, 1, 5, 6].includes(index)
    ? 'bg-white bg-opacity-10'
    : backgroundColors[index - 2];

  const fontColor = index == Elapsed['24h'] ? 'text-blue-100' : 'text-white';
  return { bgColor, fontColor };
};

const backgroundColors = ['bg-white', 'bg-primary', 'bg-blue-100'];
