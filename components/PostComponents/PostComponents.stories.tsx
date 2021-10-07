import YPostBlockQuote from './YPostBlockQuote';
import YPostCodeBlock from './YPostCodeBlock';
import YPostParagraph from './YPostParagraph';
import YPostSection from './YPostSection';

import YPostVideo from './YPostVideo';
import YPostMultipleImage from './YPostImageCollection';

import {
  paragraphBold,
  paragraphPlain,
  paragraphMixed,
  image,
  blockquote,
  video,
  codeBlock,
  section,
  multipleSections,
} from './storiesData';

export default {
  title: 'Post page section',
  component: YPostSection,
};

export const Default = (): JSX.Element => (
  <div className="bg-white px-5 max-w-189 mx-auto md:px-0">
    <YPostSection {...(section as Parameters<typeof YPostSection>[0])} />
  </div>
);

export const Paragraph = (): JSX.Element => (
  <div className="bg-white px-5 md:px-0">
    <YPostParagraph
      {...(paragraphBold as Parameters<typeof YPostParagraph>[0])}
    />
    <YPostParagraph
      {...(paragraphPlain as Parameters<typeof YPostParagraph>[0])}
    />
    <YPostParagraph
      {...(paragraphMixed as Parameters<typeof YPostParagraph>[0])}
    />
  </div>
);

export const CodeBlock = (): JSX.Element => (
  <YPostCodeBlock {...(codeBlock as Parameters<typeof YPostCodeBlock>[0])} />
);

export const BlockQuote = (): JSX.Element => (
  <div className="bg-white">
    <YPostBlockQuote
      {...(blockquote as Parameters<typeof YPostBlockQuote>[0])}
    />
    ;
  </div>
);

export const Video = (): JSX.Element => <YPostVideo {...video} />;

export const MultipleImage = (): JSX.Element => (
  <div className="bg-white max-w-189 mx-auto">
    <YPostMultipleImage images={[image, image, image]} />
  </div>
);

import useContentPreview from '@/hooks/usePostNav';
import YPostNav from './YPostNav';

export const MultipleSections = (): JSX.Element => {
  const { registerSection, sections } = useContentPreview(
    multipleSections.map(({ heading }) => heading)
  );

  return (
    <div className="bg-white px-5 max-w-189 mx-auto md:px-0">
      <YPostNav
        className="fixed top-5 left-5 bg-white"
        contentsLabel="contents"
        sections={sections}
      />
      {multipleSections.map((section, index) => (
        <YPostSection
          key={index}
          registerSection={registerSection}
          {...section}
        />
      ))}
    </div>
  );
};
