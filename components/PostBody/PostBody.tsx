import { useCallback, useEffect, useMemo, useState } from 'react';

import YPostSection, { PostNav } from '@/components/PostComponents';
import usePostNav from '@/hooks/usePostNav';

type PostSection = Omit<Parameters<typeof YPostSection>, 'children'>[0];

enum NavPosition {
  Top = 'top',
  Fixed = 'fixed',
  Bottom = 'bottom',
}

export interface Props {
  contentsLabel: string;
  postSections?: PostSection[];
}

const PostBody: React.FC<Props> = ({ contentsLabel, postSections }) => {
  const headings = useMemo(() => postSections.map(({ heading }) => heading), [
    postSections,
  ]);

  const { sections, registerSection } = usePostNav(headings);

  const [navPosition, setNavPosition] = useState(NavPosition.Top);

  const [navBoxHeight, setNavBoxHeight] = useState<number>();
  const [boxTop, setBoxTop] = useState<number>();
  const [boxBottom, setBoxBottom] = useState<number>();

  /**
   * Register nav box element (for height)
   */
  const registerNavBox = useCallback(
    (boxNode: HTMLElement | null) => {
      if (boxNode) {
        const { height } = boxNode.getBoundingClientRect();
        setNavBoxHeight(height);
      }
    },
    [setNavBoxHeight]
  );

  /**
   * Register top and bottom positions for floating nav box
   */
  const registerNavElementTop = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        const topIntersection =
          node.getBoundingClientRect().top + window.scrollY;
        setBoxTop(topIntersection);
      }
    },
    [headings, setBoxTop]
  );

  const registerNavElementBottom = useCallback(
    (node: HTMLElement | null) => {
      if (node && navBoxHeight) {
        const bottomIntersection =
          node.getBoundingClientRect().top + window.scrollY - navBoxHeight;
        setBoxBottom(bottomIntersection);
      }
    },
    [headings, setBoxBottom, navBoxHeight]
  );

  useEffect(() => {
    const controlFixed = () => {
      const windowOffset = window.scrollY;

      switch (navPosition) {
        case NavPosition.Top:
          if (windowOffset > boxTop) setNavPosition(NavPosition.Fixed);
          break;

        case NavPosition.Bottom:
          if (windowOffset < boxBottom) setNavPosition(NavPosition.Fixed);
          break;

        default:
          if (windowOffset >= boxBottom) setNavPosition(NavPosition.Bottom);
          if (windowOffset <= boxTop) setNavPosition(NavPosition.Top);
          break;
      }
    };
    if (boxTop && boxBottom) {
      window.addEventListener('scroll', controlFixed);
    }
    return () => {
      window?.removeEventListener('scroll', controlFixed);
    };
  }, [boxTop, boxBottom, navPosition]);

  return (
    <>
      <div className="relative max-w-189 pt-12 mx-auto md:pt-20 lg:min-h-64 lg:ml-5 lg:mr-auto xl:mx-auto">
        <div ref={registerNavElementTop} className="absolute top-0 h-0 w-1" />
        <PostNav
          className={getNavBoxClasses(navPosition)}
          contentsLabel={contentsLabel}
          sections={sections}
          registerNavBox={registerNavBox}
        />
        {postSections?.map((section) => (
          <YPostSection
            key={section.heading}
            {...section}
            registerSection={registerSection}
          />
        ))}
        <div
          ref={registerNavElementBottom}
          className="absolute bottom-0 h-22.5 w-1"
        />
      </div>
    </>
  );
};

const getNavBoxClasses = (navPosition: NavPosition) =>
  [...navBaseClasses, ...navBoxClasses[navPosition]].join(' ');

const navBaseClasses = [
  'hidden',
  'left-1/2',
  'transform',
  '-translate-x-155',
  'xl:block',
];

const navBoxClasses = {
  [NavPosition.Top]: ['absolute', 'top-22.5'],
  [NavPosition.Fixed]: ['fixed', 'top-22.5'],
  [NavPosition.Bottom]: ['absolute', 'bottom-0'],
};

export default PostBody;
