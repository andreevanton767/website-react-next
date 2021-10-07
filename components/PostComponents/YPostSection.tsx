import { useCallback } from 'react';

import { FontLineHeight, FontSize } from '@/enums/font';
import { PostContentType } from '@/enums/components';

import { TopLevelContentEntry } from '@/types/blogPost';

import YHeading from '@/components/YHeading';
import DynamicPostComponent from '@/components/DynamicPostComponent';
import YPostParagraph from './YPostParagraph';
import YPostBlockQuote from './YPostBlockQuote';
import YPostCodeBlock from './YPostCodeBlock';

import { RegisterSectionCallback } from '@/hooks/usePostNav';
import { __fallbackIntroHeading__ } from '@/libs/constants';

interface Props extends TopLevelContentEntry {
  heading: string;
  registerSection?: RegisterSectionCallback;
}

const YPostSection: React.FC<Props> = ({
  heading,
  content,
  registerSection = () => {},
}) => {
  const Components = {
    [PostContentType.BlockQuote]: YPostBlockQuote,
    [PostContentType.Paragraph]: YPostParagraph,
    [PostContentType.CodeBlock]: YPostCodeBlock,
    [PostContentType.Blok]: DynamicPostComponent,
    [PostContentType.HorizontalRule]: () => (
      <div className="w-full py-8">
        <div className="w-full h-px bg-blog-gray-300" />
      </div>
    ),
  };

  const registerCallback = useCallback(
    (node: HTMLElement) => {
      return registerSection(heading, node);
    },
    [heading, registerSection]
  );

  return (
    <section ref={registerCallback} className="mb-13">
      {heading !== __fallbackIntroHeading__ && (
        <YHeading {...headingProps}>{heading}</YHeading>
      )}
      {content.map(({ type, ...props }, index) => {
        if (Components[type] != undefined) {
          const Component = Components[type];
          return <Component key={`${type}-${index}`} {...props} />;
        }
        return null;
      })}
    </section>
  );
};

const headingProps = {
  fontSize: FontSize.LG,
  lineHeight: FontLineHeight.Relaxed,
  className:
    'text-blue-400 mb-3 px-5 md:mb-5 md:px-0 md:text-xll md:leading-13',
  as: 'h2',
} as Parameters<typeof YHeading>[0];

export default YPostSection;
