import { ParagraphStyling, PostContentType } from '@/enums/components';
import { FontSize, FontWeight } from '@/enums/font';

import { ContentEntryWithContent, ContentEntry } from '@/types/blogPost';

import YHeading from '@/components/YHeading';
import DynamicComponent from '@/components/DynamicPostComponent';
import Paragraph from './YPostParagraph';

//region blockquote heading
interface HeadingProps {
  content: ContentEntry[];
}

const BlockquoteHeading: React.FC<HeadingProps> = ({ content }) => (
  <YHeading {...headingProps}>
    {content.reduce(
      (acc, curr, index) => [acc, index > 0 ? ' ' : '', curr.text].join(' '),
      ''
    )}
  </YHeading>
);

const headingProps = {
  fontSize: FontSize.XS,
  fontWeight: FontWeight.SemiBold,
  className:
    'text-primary uppercase mb-3 px-5 md:px-0 md:text-md md:leading-11',
  as: 'h3',
} as Parameters<typeof YHeading>[0];
//endregion

//region main component
interface Props {
  content: ContentEntryWithContent[];
}

type ParagraphProps = Parameters<typeof Paragraph>[0];

const Components = {
  [PostContentType.Blok]: DynamicComponent,
  [PostContentType.Heading]: BlockquoteHeading,
  [PostContentType.Paragraph]: (props: ParagraphProps) => (
    <Paragraph {...props} styling={ParagraphStyling.BlockQuote} />
  ),
} as Record<PostContentType, React.FC<any>>;

const YPostBlockQuote: React.FC<Props> = ({ content }) => {
  return (
    <section className="mt-5 select-text cursor-default">
      {content.map(({ type, ...props }, index) => {
        const Component = Components[type];

        return <Component key={`${type}-${index}`} {...props} />;
      })}
    </section>
  );
};
//endregion

export default YPostBlockQuote;
