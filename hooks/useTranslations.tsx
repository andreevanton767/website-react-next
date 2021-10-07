import { useContext } from 'react';

import { Service } from '@/enums/components';
import { Month } from '@/enums/time';

import { GlobalStateContext } from '@/store/GlobalStateContext';

interface GetCategoryStrings {
  (categories: Service[]): string[];
}

interface GetDateString {
  (dateStr: string): string;
}

interface TranslationsHook {
  (): { getCategoryStrings: GetCategoryStrings; getDateString: GetDateString };
}

/**
 * Gets translations from context and returns functions for processing of translations of date and category
 * @returns functions curried with translations from context (if any)
 */
const useTranslations: TranslationsHook = () => {
  const { translations } = useContext(GlobalStateContext);

  const {
    categories: categoryTranslations,
    months: monthTranslations,
  } = translations || { categories: undefined, months: undefined };

  /**
   * Processes enum value of Service/Category to screen friendly layout
   * @param category Service enum value
   * @returns Service split and first letters capitalized
   */
  const getCategoryStrings: GetCategoryStrings = (categories) => {
    return categoryTranslations
      ? // if translations are present, translate accordingly
        categories.map((curr) => categoryTranslations[curr])
      : // if no translations are present, fall back to english versions
        categories.map((curr) =>
          curr
            .split('-')
            .map(
              (word) =>
                `${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)}`
            )
            .join(' ')
        );
  };

  /**
   * Processes date from storyblok format to display format
   * @param dateStr date string in 'yyyy-mm-dd hh:mm' format
   * @param locale locale slug ie. 'en'
   * @returns date string in '[month], [date], [year]' format
   */
  const getDateString: GetDateString = (dateStr) => {
    const [month, date, year] = new Date(dateStr)
      .toLocaleDateString('en')
      .split('/');

    return monthTranslations
      ? // if translations are present, translate accordingly
        `${monthTranslations[Number(month) - 1]}, ${date}, ${year}`
      : // if no translations are present, fall back to english versions
        `${Month[Number(month)]}, ${date}, ${year}`;
  };

  return { getCategoryStrings, getDateString };
};

export default useTranslations;
