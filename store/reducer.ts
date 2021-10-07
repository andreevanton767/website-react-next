import { ActionType } from '@/enums/globalState';

import {
  GlobalStateStore,
  MainReducer,
  ReducerAction,
} from '@/types/globalState';

// slice like reducers
const updateHeaderReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateHeader>
) => ({ ...state, header: action.payload });

const updateFooterReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateFooter>
) => ({ ...state, footer: action.payload });

const updateEditableReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateEditable>
) => ({ ...state, editableContent: action.payload });

const updateTranslationsReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateTranslations>
) => ({ ...state, translations: action.payload });

const updateMetaContentReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateMetaContet>
) => ({ ...state, metaContent: action.payload });

const updateLocalesReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateLocales>
) => ({ ...state, locales: action.payload });

const updateIsWebsiteReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateIsWebsite>
) => ({ ...state, isWebsite: action.payload });

const updateFirstRenderReducer = (
  state: GlobalStateStore,
  action: ReducerAction<ActionType.UpdateFirstRender>
) => ({ ...state, firstRender: action.payload });

/**
 * Main reducer for Redux-like global state store
 * @param state
 * @param action
 * @returns
 */
const reducer: MainReducer = (state, action) => {
  switch (action.type) {
    case ActionType.UpdateHeader:
      return updateHeaderReducer(
        state,
        action as ReducerAction<ActionType.UpdateHeader>
      );

    case ActionType.UpdateFooter:
      return updateFooterReducer(
        state,
        action as ReducerAction<ActionType.UpdateFooter>
      );

    case ActionType.UpdateEditable:
      return updateEditableReducer(
        state,
        action as ReducerAction<ActionType.UpdateEditable>
      );

    case ActionType.UpdateTranslations:
      return updateTranslationsReducer(
        state,
        action as ReducerAction<ActionType.UpdateTranslations>
      );

    case ActionType.UpdateMetaContet:
      return updateMetaContentReducer(
        state,
        action as ReducerAction<ActionType.UpdateMetaContet>
      );

    case ActionType.UpdateLocales:
      return updateLocalesReducer(
        state,
        action as ReducerAction<ActionType.UpdateLocales>
      );

    case ActionType.UpdateIsWebsite:
      return updateIsWebsiteReducer(
        state,
        action as ReducerAction<ActionType.UpdateIsWebsite>
      );

    case ActionType.UpdateFirstRender:
      return updateFirstRenderReducer(
        state,
        action as ReducerAction<ActionType.UpdateFirstRender>
      );
  }
};

export default reducer;
