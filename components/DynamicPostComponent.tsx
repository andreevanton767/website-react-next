import { BlogComponent } from '@/enums/componentWhitelist';

import { ContentEntry } from '@/types/blogPost';

import {
  PostImage,
  PostImageCollection,
  PostVideo,
} from '@/components/PostComponents';
import SubscribeSection from '@/components/SubscribeSection';

import Placeholder from './Placeholder';

/**
 * This is a component used solely to render "blok" inserted into post rich text
 * it differs from original DynamicComponent in two points:
 *    - shorter (Post only) whitelist
 *    - recieves an array of BlogBlok components in attrs.body prop (and mapps through them), instead of single storyblok component (like in original DynamicComponent)
 * @param param0
 * @returns
 */
const DynamicPostComponent: React.FC<ContentEntry> = ({
  attrs: { body },
}): JSX.Element => {
  const Components: Record<BlogComponent, React.FC> = {
    [BlogComponent.PostImage]: PostImage,
    [BlogComponent.PostImageCollection]: PostImageCollection,
    [BlogComponent.PostVideo]: PostVideo,
    [BlogComponent.SubscribeSection]: SubscribeSection,
  };

  return (
    <>
      {body.map(({ component, ...props }, index) => {
        if (typeof Components[component] !== 'undefined') {
          const Component = Components[component];
          return <Component key={`${props._uid}-${index}`} {...props} />;
        }
        return <Placeholder componentName={component} />;
      })}
    </>
  );
};

export default DynamicPostComponent;
