import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  AnimatePresence,
  m as motion,
  AnimationFeature,
  ExitFeature,
  MotionConfig,
} from 'framer-motion';

import { ButtonShape } from '@/enums/components';
import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';

import YButton from '@/components/YButton';
import YHeading from '@/components/YHeading';
import YLink from '@/components/YLink';
import YText from '@/components/YText';
import YImage from '@/components/YImage';

import Arrow from '@/assets/icons/arrow-lg.svg';

interface ButtonProps {
  link: string;
  text: string;
}

interface Review {
  text: string;
  stats: string;
  name: string;
  role: string;
  logo: string;
}

interface Props {
  title: string;
  description: string;
  buttonProps: ButtonProps;
  reviews?: Review[];
}

enum ReviewSection {
  Body = 'body',
  Credentials = 'credentials',
}

const DialogBox = dynamic(() => import('./DialogBox'), { ssr: false });

const Reviews: React.FC<Props> = ({
  title,
  description,
  buttonProps,
  reviews,
}) => {
  const [currentReview, setCurrentReview] = useState(0);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const review = reviews[currentReview];

  const setNextReview = () => {
    const nextReview = (currentReview + 1) % reviews.length;
    setCurrentReview(nextReview);
  };

  /**
   * Dialog icon
   */
  const icon = (
    <div className="relative w-25 h-17.6 mx-auto mb-8 lg:absolute lg:h-53 lg:w-15 lg:-left-25 lg:-top-1">
      <div className="absolute left-0 top-0 h-full w-20.1 lg:w-12">
        <YImage
          filename="https://a.storyblok.com/f/98632/87x75/cdc8661d10/dialog-left.png"
          width={87}
          height={75}
          alt="dialog left"
        />
      </div>
      <div className="absolute right-0 top-0 h-14 w-16 lg:h-10.5 lg:w-9">
        <YImage
          filename="https://a.storyblok.com/f/98632/69x60/fbd3af3e17/dialog-right.png"
          width={69}
          height={60}
          alt="dialog right"
        />
      </div>
    </div>
  );

  /**
   * Title, description and contact button section with icon on top / floating left
   */
  const textBox = (
    <div className="relative max-w-md mx-auto lg:mx-0 lg:max-w-none lg:absolute lg:-left-103 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:w-76.6 lg:text-left">
      {icon}
      <div className="flex justify-center text-center items-center flex-wrap lg:block lg:text-left">
        <YHeading
          fontSize={FontSize.XL}
          fontWeight={FontWeight.ExtraBold}
          as="h1"
          className="text-white order-1 mx-1 xs:mx-5.5 lg:mx-0 lg:text-3xl lg:leading-18 lg:font-bold"
        >
          {title}
        </YHeading>
        <YText
          fontSize={FontSize.SM}
          lineHeight={FontLineHeight.Relaxed}
          className="text-gray-300 order-3 mt-3 lg:text-base lg:leading-11"
          as="p"
        >
          {description}
        </YText>
        <YLink href={buttonProps.link}>
          <YButton
            shape={ButtonShape.Round}
            className="order-2 bg-blue-100 px-4.6 py-1.9 text-xxs leading-4 lg:text-base lg:leading-11 lg:py-2 lg:px-5 lg:rounded lg:shadow-blue lg:mt-5"
          >
            {buttonProps.text}
          </YButton>
        </YLink>
      </div>
    </div>
  );

  /**
   * Body of review with review text and stats
   */
  const reviewBody = (
    <div className="relative left-1/2 transform -translate-x-1/2 w-100 xs:w-78.6 xs:h-72.6 lg:left-0 lg:transform-none lg:w-157.6 lg:h-80">
      {!firstRender && <DialogBox />}
      <div
        onClick={setNextReview}
        className="svg-fit absolute cursor-pointer top-1/2 right-0 transform -translate-y-1/2 -translate-x-full w-12.5 h-12.5 xs:-translate-y-full xs:translate-x-1/4 xs:w-15 xs:h-15 rounded-full flex p-4 bg-gray-500 bg-opacity-60 lg:w-20 lg:h-20 lg:p-6 lg:-translate-y-1/2"
      >
        <Arrow />
      </div>
      <article className="w-full h-full mt-8 p-20 pt-5 pb-15 pr-20 xs:p-5 xs:pr-10 lg:mt-0 lg:pt-10 lg:pl-13 lg:pr-15 lg:pb-21 overflow-hidden">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            {...getMotionProps(ReviewSection.Body, firstRender)}
            className="overflow-hidden"
            key={review.name}
          >
            <YText
              fontWeight={FontWeight.SemiBold}
              fontSize={FontSize.SM}
              lineHeight={FontLineHeight.Relaxed}
              className="text-white mb-4 lg:text-lg lg:leading-12"
              as="p"
            >
              {review.text}
            </YText>
            <YText
              fontWeight={FontWeight.ExtraBold}
              fontSize={FontSize.SM}
              lineHeight={FontLineHeight.Relaxed}
              className="text-primary lg:text-lg lg:leading-12"
              as="p"
            >
              {review.stats}
            </YText>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );

  /**
   * Reviewer info with name, role and company
   */
  const ReviewerLogo = useMemo(
    () => require(`@/assets/icons/${review.logo}.svg`).default,
    []
  );

  const reviewCredentials = (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="flex justify-center items-center w-full lg:justify-start lg:mt-2 lg:transform"
        {...getMotionProps(ReviewSection.Credentials, firstRender)}
        key={review.name}
      >
        <div className="mr-6 lg:ml-13.6">{<ReviewerLogo />}</div>
        <div>
          <YText
            fontWeight={FontWeight.ExtraBold}
            fontSize={FontSize.SM}
            className="text-white lg:text-lg lg:leading-12"
            as="p"
          >
            {review.name}
          </YText>
          <YText
            fontSize={FontSize.SM}
            className="text-gray-300 lg:text-lg lg:leading-12"
            as="p"
          >
            {review.role}
          </YText>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <MotionConfig features={[AnimationFeature, ExitFeature]}>
      <section className="relative w-full overflow-hidden border-b border-soft">
        <div className="container pt-12.5 pb-23 lg:pt-35 lg:pb-48 lg:px-0">
          <div className="lg:ml-103">
            <div className="relative lg:w-156">
              {textBox}
              {reviewBody}
            </div>
            {reviewCredentials}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

const getMotionProps = (section: ReviewSection, firstRender: boolean) => {
  const props =
    section == ReviewSection.Body
      ? { ...motionProps }
      : {
          ...motionProps,
          initial: { ...motionProps.initial, x: motionProps.exit.x },
          exit: { ...motionProps.exit, x: motionProps.initial.x },
        };

  return firstRender ? { ...props, initial: false } : props;
};

const motionProps = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 200, opacity: 0 },
  transition: { duration: 0.2 },
};

export default Reviews;
