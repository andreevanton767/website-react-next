import { createContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

import { Service } from '@/enums/components';
import { Language } from '@/enums/language';

import {
  DispatchFunction,
  GlobalStateStore,
  TranslationsState,
} from '@/types/globalState';

import { getTranslationsClient } from '@/utils/clientRequests/getTranslationsClient';
import { updateTranslations } from '@/utils/globalState';

import { __hostname__ } from '@/libs/constants';

import reducer from './reducer';

type GlobalStateContext = GlobalStateStore & {
  dispatch: DispatchFunction;
};

export const GlobalStateContext = createContext<GlobalStateContext | null>(
  null
);

/**
 * Redux like store context provider (includes current global state and dispatch function)
 * Used for translations context and layout elements, in order for Layout element on _app level to be updated with variable header/footer content
 * @param param0
 * @returns
 */
const GlobalStateProvider: React.FC<{
  locales?: Language[];
  isWebsite?: boolean;
}> = ({ children, locales, isWebsite }) => {
  /**
   * Set up and control global state
   */
  const initialState: GlobalStateStore = {
    header: undefined,
    footer: undefined,
    editableContent: undefined,
    translations: undefined,
    metaContent: undefined,
    isWebsite,
    locales,
    firstRender: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = { ...state, dispatch };

  /**
   * control fetching of translations
   */
  const router = useRouter();
  const locale = router ? (router.locale as string | Language) : '';

  useEffect(() => {
    const updateTranslationsForLocale = async () => {
      const { CategoriesItem, MonthsItem } = await getTranslationsClient(
        __hostname__,
        {
          locale,
        }
      );

      const categories = CategoriesItem.content.categories.reduce(
        (acc, curr) => ({ ...acc, [curr.category]: curr.label }),
        {} as Record<Service, string>
      );

      const months = Object.values(MonthsItem.content);

      const translations: TranslationsState = { categories, months };

      dispatch(updateTranslations(translations));
    };

    updateTranslationsForLocale();
  }, [locale, dispatch]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
