import { Blok } from './storyblok';

import { BlogComponent } from '@/enums/componentWhitelist';
import { SubscriptionStyle } from '@/enums/components';

import { SubscribeProps } from '@/components/SubscribeSection';
import {
  PostImageProps,
  PostImageCollectionProps,
  PostVideoProps,
} from '@/components/PostComponents';

export type BlogComponentProps = {
  [BlogComponent.PostImage]: PostImageProps;
  [BlogComponent.PostImageCollection]: PostImageCollectionProps;
  [BlogComponent.PostVideo]: PostVideoProps;
  [BlogComponent.SubscribeSection]: SubscribeProps;
};

//region subscribe section
export interface SubscribeBlokProps {
  type: SubscriptionStyle;
  title: string;
  buttonText: string;
  description: string;
  placeholder: string;
}
//endregion

//region post image
export interface ImageBlokProps {
  image: {
    id: number;
    alt: string;
    name: string;
    focus: null;
    title: string;
    filename: string;
    copyright: string;
    fieldtype: string;
  };
  caption: string;
}
//endregion

//region post image
export interface ImageCollectionBlokProps {
  images: ImageBlokProps[];
}
//endregion

//region video
export interface VideoBlokProps {
  url: string;
  caption?: string;
}
//endregion

export type BlogBlokProps = {
  [BlogComponent.SubscribeSection]: SubscribeBlokProps;
  [BlogComponent.PostImage]: ImageBlokProps;
  [BlogComponent.PostImageCollection]: ImageCollectionBlokProps;
  [BlogComponent.PostVideo]: VideoBlokProps;
};

export type BlogBlok = Blok<BlogBlokProps[BlogComponent]>;
