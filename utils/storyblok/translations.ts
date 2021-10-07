import { Month } from '@/enums/time';

import { TranslationsRes, TranslatedCategories } from '@/types/i18n';

export const mapTranslations = ({
  MonthsItem,
  CategoriesItem,
}: TranslationsRes) => ({
  months: mapMonths(MonthsItem),
  categories: mapCategories(CategoriesItem),
});

const mapMonths = (MonthsItem: TranslationsRes['MonthsItem']) =>
  Array(12)
    .fill(null)
    .map((_, index) => MonthsItem.content[Month[index + 1]]) as string[];

const mapCategories = (CategoriesItem: TranslationsRes['CategoriesItem']) =>
  CategoriesItem.content.categories.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.category]: curr.label,
    }),
    {}
  ) as TranslatedCategories;
