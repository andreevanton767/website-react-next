import {
  MarkType,
  PostContentType,
  Service,
  LinkType,
} from '@/enums/components';

import { Blok, SbImage } from './storyblok';
import { BlogBlok } from './blogComponentProps';

import { PostTopProps } from '@/components/PostTop';
import { PostsSliderProps } from '@/components/PostsSlider';
import { PostBodyProps } from '@/components/PostBody';

export type PostPageProps = {
  topProps: PostTopProps;
  bodyProps: PostBodyProps;
  sliderProps: PostsSliderProps;
};

export interface Mark {
  type: MarkType;
  attrs?: {
    href: string;
    uuid: string;
    anchor: unknown;
    target: unknown;
    linktype: LinkType;
  };
}

//region long text props
export type ContentEntry = {
  type?: PostContentType;
  text?: string;
  marks?: Mark[];
  attrs?: {
    body?: BlogBlok[];
    class?: string;
  };
};

export type ContentEntryWithContent = ContentEntry & {
  content?: ContentEntry[];
};

export type TopLevelContentEntry = ContentEntry & {
  content?: ContentEntryWithContent[];
};
//endregion

//region blok props
interface AuthorBlokProps {
  content: Blok<{
    name: string;
    role: string;
    image: SbImage;
    title: string;
    interests: string;
  }>;
}

interface TagBlokProps {
  content: Blok<{
    icon?: string;
    color: string;
    label: string;
    tag: string;
  }>;
}
//endregion

//region post preview
export interface PostPreview {
  first_published_at: string;
  slug: string;
  content: Blok<{
    title: string;
    intro: string;
    categories: Service[];
    cover: {
      filename: string;
    };
  }>;
}
//end region

//region post res
export interface PostItem {
  first_published_at: string;
  firstPublishedAt: string;
  slug: string;
  content: Blok<{
    authors: AuthorBlokProps[];
    tags: TagBlokProps[];
    categories: Service[];
    keywords: string;
    description: string;
    title: string;
    intro: string;
    cover?: SbImage;
    graphic: string;
    long_text: TopLevelContentEntry;
  }>;
}

export interface RecentPostsRes {
  PostItems: {
    items: PostPreview[];
  };
}
//endregion
