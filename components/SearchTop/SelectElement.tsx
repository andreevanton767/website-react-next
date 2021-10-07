import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimationFeature, ExitFeature, MotionConfig } from 'framer-motion';

import DownArrow from '@/assets/inline/arrow-down.svg';

import useClickOutside from '@/hooks/useClickOutside';

import YAnimateItem from '@/components/AnimateComponents/YAnimateItem';
import YExpandableRegion from '@/components/AnimateComponents/YExpandableRegion';

interface Props {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (checked: string[] | string) => void;
  singleOption?: boolean;
}

const SelectElement: React.FC<Partial<Props>> = ({
  label,
  options,
  singleOption = false,
  onChange = () => {},
}) => {
  // set up initial value
  const selectedObject = useMemo(
    () =>
      singleOption
        ? options[0].value
        : options.reduce((acc, curr) => ({ ...acc, [curr.value]: false }), {}),
    [label, singleOption]
  );

  const [selected, setSelected] = useState<Record<string, any> | string>(
    selectedObject
  );

  // simulate on change
  useEffect(() => {
    const changeValue = singleOption
      ? (selected as string)
      : Object.keys(selected).reduce(
          (acc, curr) => (selected[curr] ? [...acc, curr] : acc),
          [] as string[]
        );

    onChange(changeValue);
  }, [selected]);

  // control opening and closing
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useClickOutside(ref, () => setOpen(false));

  const toggleOption = (value: string) => {
    // update selection for multiple, or assign value for single option
    const updatedState = singleOption
      ? value
      : {
          ...(selected as Record<string, any>),
          [value]: !selected[value],
        };
    setSelected(updatedState);
  };

  const toggleOpen = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  /**
   * Used to check if value is selected (for bg-color)
   * @param value
   * @returns boolean
   */
  const checkSelected = (value: string) =>
    (singleOption && value === selected) || (!singleOption && selected[value]);

  return (
    <MotionConfig features={[AnimationFeature, ExitFeature]}>
      <div
        ref={ref}
        onClick={toggleOpen}
        className={containerClasses.join(' ')}
      >
        {label}
        <span className="hidden ml-1 md:inline-block">
          <DownArrow />
        </span>
        <YExpandableRegion className="absolute top-full" open={open}>
          <div className="border border-blog-gray-100 bg-white rounded">
            {options?.map(({ label, value }) => (
              <YAnimateItem
                key={label}
                onClick={() => toggleOption(value)}
                className={[
                  'cursor-pointer font-normal p-2',
                  checkSelected(value)
                    ? 'text-primary text-semiblod'
                    : 'text-black',
                ].join(' ')}
              >
                {label}
              </YAnimateItem>
            ))}
          </div>
        </YExpandableRegion>
      </div>
    </MotionConfig>
  );
};

const containerClasses = [
  'font-sans',
  'text-sm',
  'font-semibold',
  'relative',
  'fill-current',
  'flex',
  'items-center',
  'mr-5',
  'select-none',
  'md:leading-6',
  'text-blue-400',
  'cursor-pointer',
  'z-20',
];

export default SelectElement;
