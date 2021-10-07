import React, { useEffect, useState } from 'react';

import { ImageFormat } from '@/enums/images';

export const ImageFormatContext = React.createContext<ImageFormat | null>(null);

export const ImgFormatProvider: React.FC = ({ children }) => {
  const [format, setFormat] = useState<ImageFormat | null>(null);

  useEffect(() => {
    setFormat(() => ImageFormat.WebP);
  }, []);

  return (
    <ImageFormatContext.Provider value={format}>
      {children}
    </ImageFormatContext.Provider>
  );
};
