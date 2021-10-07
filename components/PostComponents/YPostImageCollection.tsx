import YPostImage, { ImageProps } from './YPostImage';

export interface ImageCollectionProps {
  images: ImageProps[];
}

const YImageCollection: React.FC<ImageCollectionProps> = ({ images }) => {
  return (
    <div className="w-full scroll-x-container whitespace-nowrap pt-3 pb-12 md:pt-5 md:pb-13 md:grid md:grid-cols-2 md:gap-5">
      <div className="inline-block scroll-x-item md:hidden" />
      {images?.map((image, index) => (
        <div
          key={`${image.caption}-${index}`}
          className={getItemClasses(index, images.length)}
        >
          <YPostImage {...image} inGrid />
        </div>
      ))}
    </div>
  );
};

const getItemClasses = (index: number, numItems: number) =>
  [
    'inline-block whitespace-normal scroll-x-item mx-2 w-70 xs:w-75 md:w-auto md:block md:mx-0',
    index === numItems - 1 && numItems % 2 === 1 ? 'md:col-span-2' : '',
  ].join(' ');

export default YImageCollection;
