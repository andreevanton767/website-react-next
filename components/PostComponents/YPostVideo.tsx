import { useEffect, useRef, useState } from 'react';

import { ScreenSize } from '@/enums/screenSize';
import { FontLineHeight, FontSize } from '@/enums/font';

import YText from '@/components/YText';

import useBreakpoint from '@/hooks/useBreakpoint';

export interface VideoProps {
  url: string;
  caption?: string;
}

interface VimeoRes {
  height: number;
  html: string;
  thumbnail_height: number;
  thumbnail_url: string;
  thumbnail_url_with_play_button: string;
  thumbnail_width: number;
  width: number;
}

const YPostImage: React.FC<VideoProps> = ({ url, caption }) => {
  const { screenSize } = useBreakpoint([ScreenSize.SM, ScreenSize.MD]);

  const [videoHTML, setVideoHTML] = useState('');
  const videoData = useRef<VimeoRes>(null);
  const videoContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getVideo = async (src: string) => {
      const res = await fetch(
        `https://vimeo.com/api/oembed.json?url=${src}&width="756"&responsive="true"`,
        {
          method: 'GET',
        }
      );

      const data = (await res.json()) as VimeoRes;

      videoData.current = data;
      setVideoHTML(data.html);
    };

    getVideo(url);
  }, [url, screenSize]);

  return (
    <figure className="w-full mt-3 mb-8 md:mt-5 md:mb-13">
      <div
        className="w-full overflow-hidden bg-black md:rounded"
        ref={videoContainer}
        dangerouslySetInnerHTML={{ __html: videoHTML }}
      />
      <YText {...textProps}>{caption}</YText>
    </figure>
  );
};

const textProps = {
  fontSize: FontSize.XS,
  lineHeight: FontLineHeight.Relaxed,
  className: 'block text-blog-gray-100 text-center px-5 md:px-7',
  as: 'figcaption',
} as Parameters<typeof YText>[0];

export default YPostImage;
