import { SbEditableContent } from 'storyblok-react';

import { ActionType } from '@/enums/globalState';
import { Language } from '@/enums/language';

import { HeaderBlokProps, FooterBlokProps } from '@/types/layout';
import { TranslatedCategories } from '@/types/i18n';

import { MetaContent } from '@/components/Head';
import { Dispatch } from 'react';

export interface TranslationsState {
  months: string[] | undefined;
  categories: TranslatedCategories;
}

export interface GlobalStateStore {
  header: HeaderBlokProps | undefined;
  footer: FooterBlokProps | undefined;
  editableContent: SbEditableContent | undefined;
  translations: TranslationsState;
  metaContent: MetaContent;
  locales: Language[] | undefined;
  isWebsite: boolean;
  firstRender: boolean;
}

interface ActionPayload {
  [ActionType.UpdateHeader]: HeaderBlokProps | undefined;
  [ActionType.UpdateFooter]: FooterBlokProps | undefined;
  [ActionType.UpdateEditable]: SbEditableContent | undefined;
  [ActionType.UpdateTranslations]: TranslationsState | undefined;
  [ActionType.UpdateMetaContet]: MetaContent | undefined;
  [ActionType.UpdateLocales]: Language[] | undefined;
  [ActionType.UpdateIsWebsite]: boolean;
  [ActionType.UpdateFirstRender]: boolean;
}

export interface ReducerAction<A extends ActionType> {
  type: A;
  payload: ActionPayload[A];
}

export interface MainReducer {
  <A extends ActionType>(
    state: GlobalStateStore,
    action: ReducerAction<A>
  ): GlobalStateStore;
}

export type DispatchFunction = Dispatch<ReducerAction<ActionType>>;
