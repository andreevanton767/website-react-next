import { ScreenSize } from '@/enums/screenSize';
import { FontLineHeight, FontSize } from '@/enums/font';

import YImage from '@/components/YImage';
import YText from '@/components/YText';

export interface ImageProps {
  image: { alt?: string; filename: string };
  caption?: string;
  inGrid?: boolean;
}

const YPostImage: React.FC<ImageProps> = ({
  image,
  caption,
  inGrid = false,
}) => (
  <figure
    className={['w-full', inGrid ? '' : 'mt-3 mb-8 md:mt-5 md:mb-13'].join(' ')}
  >
    <div className="w-full h-87.5 mb-4 sm:h-125 md:rounded-sm overflow-hidden">
      <YImage {...image} {...imageProps} />
    </div>
    <YText {...getTextProps(inGrid)}>{caption}</YText>
  </figure>
);

const imageProps = {
  className: 'transform -translate-x-1/2 h-full',
  width: 0,
  height: 350,
  responsive: {
    [ScreenSize.SM]: { width: 0, height: 500 },
  },
};

const getTextProps = (inGrid: boolean) =>
  ({
    fontSize: FontSize.XS,
    lineHeight: FontLineHeight.Relaxed,
    className: [
      'block text-blog-gray-100',
      inGrid ? '' : 'text-center px-5 md:px-7',
    ].join(' '),
    as: 'figcaption',
  } as Parameters<typeof YText>[0]);

export default YPostImage;
