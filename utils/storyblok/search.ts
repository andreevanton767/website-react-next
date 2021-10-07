import { PostContentType } from '@/enums/components';

import {
  MappedSearchProps,
  SearchpageItem,
  SearchPostsRes,
  TagBlokProps,
} from '@/types/search';

export const mapSearchProps = (
  { content }: SearchpageItem,
  PostItems: SearchPostsRes['PostItems'],
  tagItems: TagBlokProps[]
): MappedSearchProps => {
  const editableContent = content;
  const {
    title,
    header,
    footer,
    keywords,
    description,
    ...topPropsPartial
  } = content;

  const topProps = {
    ...topPropsPartial,
    tags: tagItems.map(({ content: { _uid, label } }) => ({
      label,
      value: _uid,
    })),
  };

  const layoutProps = {
    header,
    footer,
    metaContent: { title, keywords, description },
    editableContent,
  };

  const postPreviewProps = mapPostPreviews(PostItems);

  return { topProps, layoutProps, ...postPreviewProps };
};

export const mapPostPreviews = (
  PostItems: SearchPostsRes['PostItems']
): { numPages: number; postPreviews: MappedSearchProps['postPreviews'] } => {
  const { items, total } = PostItems;
  const numPages = Math.floor(total / 4) + (total % 4 > 0 ? 1 : 0);

  const postPreviews = items?.map(
    ({
      content: { long_text, tags, ...content },
      slug,
      first_published_at,
    }) => ({
      ...content,
      slug,
      firstPublished: first_published_at,
      views: 0,
      excerpt: long_text.content.find(
        ({ type }) => type === PostContentType.Paragraph
      )?.content,
      tags: tags.map(({ content }) => content),
    })
  );

  return { postPreviews, numPages };
};
