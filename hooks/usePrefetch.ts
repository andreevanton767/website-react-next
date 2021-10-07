import { useContext, useEffect, useState } from 'react';

import { ImageFormatContext } from '@/context/ImgFormatContext';

import { createSrcSet } from '@/components/YImage';

interface PrefetchHook {
  (images: string[] | { filename: string; height: number; width: number }[]);
}

/**
 * Hook for prefetching of images, fetches  images on mount
 * @param images array of image sources if fetching all on mount
 */
const usePrefetch: PrefetchHook = (images) => {
  // start prefetching on idle time when context ready
  const format = useContext(ImageFormatContext);
  const [ready, setReady] = useState(false);

  const setReadyOnLoad = () => setReady(true);
  window.addEventListener('load', setReadyOnLoad);

  // Contains boolean checks if images are fetched
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    // check if window loaded
    if (ready && format) {
      // check if images already fetched
      if (!fetched) {
        images.forEach((image) => {
          // check to fetch original or request img2
          const src =
            typeof image == 'string'
              ? image
              : createSrcSet(format, image.width, image.height, image.filename);

          new Image().src = src;
        });
        setFetched(true);
        window.removeEventListener('load', setReadyOnLoad);
      }
    }
  }, [ready, format]);
};

export default usePrefetch;
