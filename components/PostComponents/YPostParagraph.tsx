import React from 'react';

import { FontLineHeight, FontSize, FontWeight } from '@/enums/font';
import { MarkType, ParagraphStyling, LinkType } from '@/enums/components';

import { ContentEntry, Mark } from '@/types/blogPost';

import YText from '@/components/YText';
import YConditionalWrapper from '@/components/YConditionalWrapper';
import YLink from '@/components/YLink';
import YOutLink from '@/components/YOutLink';

type TextProps = Omit<Parameters<typeof YText>[0], 'content'>;

interface Props extends TextProps {
  content?: ContentEntry[];
  styling?: ParagraphStyling;
}

const YPostParagraph: React.FC<Props> = ({
  className,
  content,
  styling = ParagraphStyling.Default,
  ...props
}) => {
  return (
    <YText {...getProps(className, props, styling)}>
      {content?.map(({ text, marks }, index) => {
        const wrapper: React.FC = ({ children }) => {
          // check if marks includes "link"
          const link = marks.find(({ type }) => type === MarkType.Link);

          return !link ? (
            <>
              <span {...getMarkedProps(marks, styling)}>{children}</span>{' '}
            </>
          ) : link.attrs!.linktype === LinkType.Story ? (
            <>
              <YLink href={link.attrs.href}>
                <a {...getMarkedProps(marks, styling)}>{children}</a>
              </YLink>{' '}
            </>
          ) : (
            <>
              <YOutLink
                href={link.attrs.href}
                {...getMarkedProps(marks, styling)}
              >
                {children}
              </YOutLink>{' '}
            </>
          );
        };

        return (
          <YConditionalWrapper
            key={`${text.slice(10)}-${index}`}
            wrapper={wrapper}
            condition={Boolean(marks)}
            children={text}
          />
        );
      })}
    </YText>
  );
};

// styling props
const getProps = (
  className: string,
  props: Omit<TextProps, 'className'>,
  styling: ParagraphStyling
) =>
  ({
    ...baseProps[styling],
    className: [
      ...paragraphBaseClasses,
      ...paragraphAdditionalClasses[styling],
      className,
    ].join(' '),
    as: 'p',
    ...props,
  } as TextProps);

const baseProps = {
  [ParagraphStyling.Default]: {
    fontSize: FontSize.XS,
    lineHeight: FontLineHeight.Loose,
  },
  [ParagraphStyling.BlockQuote]: {
    fontSize: FontSize.LG,
    lineHeight: FontLineHeight.Loose,
    fontWeight: FontWeight.SemiBold,
  },
};

const paragraphBaseClasses = [
  'text-blog-gray-200',
  'w-full',
  'pb-5',
  'px-5',
  'md:pb-8',
  'select-text',
  'cursor-default',
];

const paragraphAdditionalClasses = {
  [ParagraphStyling.Default]: ['md:px-7', 'md:text-sm', 'md:leading-10'],
  [ParagraphStyling.BlockQuote]: [
    'font-serif',
    'md:px-0',
    'md:text-xl',
    'md:leading-13',
  ],
};

// additional props for marked text
const getMarkedProps = (marks: Mark[] = [], styling: ParagraphStyling) => {
  // get appropriate mark classes with respect to styling
  const markClasses =
    styling === ParagraphStyling.Default ? markProps : markPropsBlockQuote;

  return {
    className: [
      ...(marks?.map(({ type }) => markClasses[type].join(' ')) || []),
    ].join(' '),
  };
};

const markProps = {
  [MarkType.Bold]: [
    'text-blue-400',
    'text-sm',
    'leading-10',
    'md:text-base',
    'md:leading-11',
  ],
  [MarkType.Italic]: ['italic'],
  [MarkType.Link]: ['underline', 'text-primary'],
  [MarkType.StrikeThrough]: ['line-through'],
  [MarkType.Underline]: ['underline'],
  [MarkType.Code]: [
    'leading-none',
    'bg-green-100',
    'text-green-500',
    'px-2',
    'py-1',
    'rounded',
  ],
};

const markPropsBlockQuote = {
  ...markProps,
  [MarkType.Bold]: [
    'text-primary',
    'text-xl',
    'leading-13',
    'md:text-xxl',
    'md:leading-14',
  ],
  [MarkType.Code]: [...markProps[MarkType.Code], 'font-sans', 'font-normal'],
};

export default YPostParagraph;
