import React, { useEffect, useRef, useState } from 'react';
import { m as motion, AnimationFeature, MotionConfig } from 'framer-motion';
import { useRouter } from 'next/router';

import { ScreenSize } from '@/enums/screenSize';

import { FeaturedCategories } from '@/types/categoryPage';

import PostPreview, { PostPreviewProps } from '@/components/PostPreview';
import Pagination from '@/components/Pagination';

import useBreakpoint from '@/hooks/useBreakpoint';

interface Props {
  postPreviews: PostPreviewProps[];
  numPages: number;
  scrollToTop?: boolean;
  featuredCategories?: FeaturedCategories;
}

const PostPreviewBody: React.FC<Props> = ({
  postPreviews,
  numPages,
  scrollToTop,
  featuredCategories,
}) => {
  const { screenSize } = useBreakpoint();

  // used as inbetween state to hide posts (create animation) between pages
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [newRoute, setNewRoute] = useState('');

  // top element ref (to scroll to)
  const topRef = useRef<HTMLDivElement>();

  // set loading false on every post content change to show posts
  useEffect(() => {
    setLoadingPosts(false);
  }, [postPreviews]);

  // used to prefetch and push route when updated
  // usde this way to trigger scroll / fade animation first, and then start fetching
  useEffect(() => {
    if (newRoute) {
      // get router operations
      const { push, prefetch } = router;

      // get scroll to value
      const headerOffset = screenSize === ScreenSize.SM ? 62 : 0;

      const offsetTop = scrollToTop
        ? 0
        : topRef.current
        ? topRef.current.getBoundingClientRect().bottom +
          window.scrollY -
          headerOffset
        : undefined;

      // prefetch new route
      prefetch(newRoute);

      // if offset present, scroll to top
      if (offsetTop || offsetTop === 0) {
        window.scrollTo({ top: offsetTop });
      }

      // push to new route
      setTimeout(() => push(newRoute, newRoute, { scroll: false }), 500);
    }
  }, [newRoute]);

  // control pagination
  const router = useRouter();

  const controlPagination = (newPage: number) => {
    // get router operations
    const { asPath } = router;

    // create new route
    const nextRoute = asPath.includes('page')
      ? asPath.replace(/page=[0-9]*/, `page=${newPage}`)
      : `${asPath}${asPath.includes('?') ? '&' : '?'}page=${newPage}`;

    // set new route and start animation + fetching + transition
    setNewRoute(nextRoute);
    setLoadingPosts(true);
  };

  return (
    <MotionConfig features={[AnimationFeature]}>
      <div ref={topRef} />
      {postPreviews?.map((post, index) => (
        <motion.div
          layout
          key={`${post.title}-${index}`}
          {...getMotionProps(!loadingPosts)}
        >
          <PostPreview {...post} />
        </motion.div>
      ))}
      <Pagination
        onChange={controlPagination}
        numPages={numPages}
        featuredCategories={featuredCategories}
      />
    </MotionConfig>
  );
};

const getMotionProps = (showItems: boolean) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: showItems ? 'show' : 'hide',
  variants: {
    hide: {
      opacity: 0,
      scale: 0.8,
      transition: { delay: 0.3, duartion: 0.5 },
    },
    show: {
      opacity: 1,
      scale: 1,
    },
  },
  transition: {
    type: 'tween',
  },
});

export default PostPreviewBody;
