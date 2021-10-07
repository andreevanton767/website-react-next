import { SbEditableContent } from 'storyblok-react';

import { ActionType } from '@/enums/globalState';
import { Language } from '@/enums/language';

import {
  DispatchFunction,
  ReducerAction,
  TranslationsState,
} from '@/types/globalState';
import { FooterBlokProps, HeaderBlokProps, LayoutProps } from '@/types/layout';

import { MetaContent } from '@/components/Head';

//region action creators
export const updateHeader = (
  header: HeaderBlokProps
): ReducerAction<ActionType.UpdateHeader> => ({
  type: ActionType.UpdateHeader,
  payload: header,
});

export const updateFooter = (
  footer: FooterBlokProps
): ReducerAction<ActionType.UpdateFooter> => ({
  type: ActionType.UpdateFooter,
  payload: footer,
});

export const updateEditable = (
  editableContent: SbEditableContent
): ReducerAction<ActionType.UpdateEditable> => ({
  type: ActionType.UpdateEditable,
  payload: editableContent,
});

export const updateTranslations = (
  translations: TranslationsState
): ReducerAction<ActionType.UpdateTranslations> => ({
  type: ActionType.UpdateTranslations,
  payload: translations,
});

export const updateMetaContent = (
  metaContent: MetaContent
): ReducerAction<ActionType.UpdateMetaContet> => ({
  type: ActionType.UpdateMetaContet,
  payload: metaContent,
});

export const updateLocales = (
  locales: Language[]
): ReducerAction<ActionType.UpdateLocales> => ({
  type: ActionType.UpdateLocales,
  payload: locales,
});

export const updateIsWebsite = (
  isWebsite: boolean
): ReducerAction<ActionType.UpdateIsWebsite> => ({
  type: ActionType.UpdateIsWebsite,
  payload: isWebsite,
});

export const UpdateFirstRender = (
  firstRender: boolean
): ReducerAction<ActionType.UpdateFirstRender> => ({
  type: ActionType.UpdateFirstRender,
  payload: firstRender,
});

//endregion

//region combined store update functions
/**
 * Lift all layout updates to global state
 * @param param0
 * @param dispatch
 */
export const updatePageContext = (
  {
    editableContent,
    footer,
    metaContent,
    header,
    isWebsite,
  }: LayoutProps & { isWebsite: boolean },
  dispatch: DispatchFunction
) => {
  dispatch(updateHeader(header));
  dispatch(updateFooter(footer));
  dispatch(updateMetaContent(metaContent));
  dispatch(updateEditable(editableContent));
  dispatch(updateIsWebsite(isWebsite));
  setTimeout(() => dispatch(UpdateFirstRender(false)), 1000);
};
//endregion
