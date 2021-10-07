import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface SectionEntry {
  heading: string;
  element?: HTMLElement;
}

interface SectionRenderData {
  heading: string;
  isIntersecting: boolean;
  onClick: () => void;
}

enum ObservedPosition {
  Next = 'next',
  Prev = 'prev',
}

export interface RegisterSectionCallback {
  (heading: string, node: HTMLElement): void;
}

interface ContentPreviewHook {
  (headings: string[]): {
    registerSection: RegisterSectionCallback;
    sections: SectionRenderData[];
  };
}

/**
 * Hook for floating content preview of blog post, based on intersection observer
 * @param headings headings used to register each section
 * @returns
 *      - "registerSection" callback used to register <section> ref for each section with the existing sections entry
 *      - "sections" entries with each section containing "heading", "isIntersecting" and "onClick" handler used to render the floating content box
 */
const useContentPreview: ContentPreviewHook = (headings) => {
  // store of all sections data (heading, element ref) array
  const sectionsStore = useRef<SectionEntry[]>(
    headings.map((heading) => ({ heading }))
  );

  // refresh sections store when headings are updated (passed as props, causing somewhat componentDidUpdate)
  useEffect(() => {
    sectionsStore.current = headings.map((heading) => ({ heading }));
  }, [headings]);

  // used to force rerender when section element gets registered (as its stored in ref, not causing rerender on it's own)
  const [forcedRerender, forceRerender] = useState({});

  // current section
  const [currentIntersecting, setIntersecting] = useState(0);

  // refs of previous and next section observers respectively
  const observerPrev = useRef<IntersectionObserver>();
  const observerNext = useRef<IntersectionObserver>();

  /**
   * HOF returning callback for previous and next observer respectively
   * @param position prev or next ;
   * @returns
   */
  const observerCallback = (
    position: ObservedPosition
  ): IntersectionObserverCallback => (entries) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      const newIntersecting =
        position === ObservedPosition.Next
          ? currentIntersecting + 1
          : currentIntersecting - 1;

      setIntersecting(newIntersecting);
    }
  };

  // ran when section refs get registered and on each current update
  useEffect(() => {
    // get elements for all registered sections
    const sectionElements = sectionsStore.current.reduce(
      (acc, curr) => (Boolean(curr.element) ? [...acc, curr.element] : acc),
      []
    );
    const numSections = sectionElements.length;

    // run only after at least one element is registered
    if (numSections > 0) {
      // disconnect prevoius observers, if any
      observerPrev.current?.disconnect();
      observerNext.current?.disconnect();

      // create new observers
      if (currentIntersecting > 0) {
        observerPrev.current = new IntersectionObserver(
          observerCallback(ObservedPosition.Prev),
          { rootMargin: '-51% 0px 0px 0px' }
        );

        const prevSection = sectionElements[currentIntersecting - 1];
        observerPrev.current.observe(prevSection);
      }
      if (currentIntersecting < numSections - 1) {
        observerNext.current = new IntersectionObserver(
          observerCallback(ObservedPosition.Next),
          { rootMargin: '0px 0px -51% 0px' }
        );

        const nextSection = sectionElements[currentIntersecting + 1];
        observerNext.current.observe(nextSection);
      }
    }
  }, [forcedRerender, currentIntersecting, headings]);

  /**
   * Register function, part of return structure, used as callback to register <section> element ref of each section
   */
  const registerSection: RegisterSectionCallback = useCallback(
    (heading, node) => {
      if (sectionsStore.current) {
        const currentSection = sectionsStore.current.findIndex(
          (section) => section.heading === heading
        );
        // Add aditional guard to prevent crashing on live editor
        // Crashing happens as the headings (on already munted hook), get updated on next reconcilliation pass (useEffect)
        if (currentSection !== -1) {
          sectionsStore.current[currentSection].element = node;
        }
      }
      forceRerender({});
    },
    [headings, sectionsStore.current]
  );

  /**
   * HOF returning onClick handler for each section in post nav to control scroll to section
   */
  const handleClick = (node: HTMLElement) => () => {
    const { top } = node.getBoundingClientRect();
    const offsetTop = window.scrollY;
    window.scrollTo({ top: top + offsetTop, behavior: 'smooth' });
  };

  // returns list of sections (with heading, isIntersecting and onClick) used to render nav
  const sections =
    // useMemo(
    //   () =>
    sectionsStore.current?.map(({ heading, element }, index) => ({
      heading,
      isIntersecting: currentIntersecting === index,
      onClick: handleClick(element),
    })) || [];
  //   [currentIntersecting, forcedRerender]
  // );

  return { registerSection, sections };
};

export default useContentPreview;
