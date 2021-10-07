import YPostSection from './YPostSection';

import YPostImage, { ImageProps } from './YPostImage';
import YPostImageCollection, {
  ImageCollectionProps,
} from './YPostImageCollection';
import YPostVideo, { VideoProps } from './YPostVideo';
import YPostNav from './YPostNav';

export const PostImage = YPostImage;
export const PostImageCollection = YPostImageCollection;
export const PostVideo = YPostVideo;
export const PostNav = YPostNav;

export type PostImageProps = ImageProps;
export type PostImageCollectionProps = ImageCollectionProps;
export type PostVideoProps = VideoProps;

export default YPostSection;
