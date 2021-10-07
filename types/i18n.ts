import { Service } from '@/enums/components';

import { Blok, Space } from './storyblok';

//region language codes res
export type LanguageCodesResponse = {
  Space: Pick<Space, 'languageCodes'>;
};
//endregion

//region translations res
interface Months {
  January: string;
  February: string;
  March: string;
  April: string;
  May: string;
  June: string;
  July: string;
  August: string;
  September: string;
  October: string;
  November: string;
  December: string;
}

interface Categories {
  categories: Blok<{
    label: string;
    category: Service;
  }>[];
}

export interface TranslationsRes {
  MonthsItem: {
    content: Months;
  };
  CategoriesItem: {
    content: Categories;
  };
}
//endregion

//region other
export type TranslatedCategories = Record<Service, string>;
//endregion
