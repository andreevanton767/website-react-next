import React from 'react';

import { TranslatedCategories } from '@/types/i18n';

interface TranslationsContext {
  months: string[];
  categories: TranslatedCategories;
}

export const TranslationsContext = React.createContext<TranslationsContext | null>(
  null
);

const TranslationsContextProvider: React.FC<TranslationsContext> = ({
  children,
  ...context
}) => {
  return (
    <TranslationsContext.Provider value={context}>
      {children}
    </TranslationsContext.Provider>
  );
};

export default TranslationsContextProvider;
