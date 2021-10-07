import { PostContentType } from '@/enums/components';

import { PostItem, PostPageProps } from '@/types/blogPost';

import { __fallbackIntroHeading__ } from '@/libs/constants';

interface PropsReturnType {
  topProps: Partial<Omit<PostPageProps['topProps'], 'socialMedia'>>;
  bodyProps: Partial<Omit<PostPageProps['bodyProps'], 'contentsLabel'>>;
  metaContent: {
    title: string;
    keywords: string;
    description: string;
  };
}

export const mapPostProps = (PostItem: PostItem): PropsReturnType => {
  const {
    first_published_at: firstPublished,
    content: {
      long_text,
      authors,
      tags,
      keywords,
      description,
      title,
      ...props
    },
  } = PostItem;

  const topProps = {
    ...props,
    title,
    tags: tags.map(({ content }) => content),
    authors: authors.map(
      ({ content: { _editable, _uid, component, ...author } }) => author
    ),
    firstPublished,
    views: 0 /**@TODO fix this */,
  };

  // body props
  const postSections = groupSections(long_text);

  return {
    topProps,
    metaContent: { title, keywords, description },
    bodyProps: {
      postSections,
    },
  };
};

/**
 * Group sections from long_text for post body
 * @param rtf
 * @returns
 */
const groupSections = (rtf: PostItem['content']['long_text']) => {
  // early error handling
  if (!Boolean(rtf.content?.length)) {
    return [];
  }

  let currentSection = 0;

  const result = rtf.content.reduce((acc, curr, index) => {
    const safeAcc = [...acc];

    // run only for first item
    if (index === 0) {
      // if first item heading, init sections array normally (set first section heading)
      if (curr.type === PostContentType.Heading && curr.content) {
        safeAcc[0] = {
          heading: curr.content.reduce(
            (acc, curr) => [acc, curr.text].join(' ').trim(),
            ''
          ),
          content: [],
        };
      } else {
        // else fallback to "Intro" as first section title
        safeAcc[0] = {
          heading: __fallbackIntroHeading__,
          content: [curr],
        };
      }

      return safeAcc;
    }

    // when new heading is found, open the new section in the return array
    if (curr.type === PostContentType.Heading) {
      safeAcc[++currentSection] = {
        heading:
          curr?.content?.reduce(
            (acc, curr) => [acc, curr.text].join(' ').trim(),
            ''
          ) || __fallbackIntroHeading__,
        content: [],
      };
      // for all non heading components, append the component to current sections content array
    } else {
      safeAcc[currentSection] = {
        ...safeAcc[currentSection],
        content: [...safeAcc[currentSection].content, curr],
      };
    }

    return safeAcc;
  }, []);

  return result;
};
