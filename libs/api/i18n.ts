import { ApolloQueryResult, DocumentNode, gql } from '@apollo/client';

import { TranslationsRes, LanguageCodesResponse } from '@/types/i18n';

import graphqlClient from '@/utils/graphql';

//region queryes
export const GET_TRANSLATIONS: DocumentNode = gql`
  query Translations($monthsId: ID!, $categoriesId: ID!) {
    MonthsItem(id: $monthsId) {
      content {
        January
        February
        March
        April
        May
        June
        July
        August
        September
        October
        November
        December
      }
    }
    CategoriesItem(id: $categoriesId) {
      content {
        categories
      }
    }
  }
`;

export const GET_LANGUAGES = gql`
  query getLanguages {
    Space {
      languageCodes
    }
  }
`;
//endregion

//region query functions
export const getTranslations = async ({
  preview = false,
  monthsId,
  categoriesId,
}: {
  preview?: boolean;
  monthsId: string;
  categoriesId: string;
}): Promise<ApolloQueryResult<TranslationsRes>> =>
  graphqlClient({ preview }).query({
    query: GET_TRANSLATIONS,
    variables: { monthsId, categoriesId },
  });

export const getLanguages = async ({
  preview = false,
}: {
  preview: boolean;
}): Promise<ApolloQueryResult<LanguageCodesResponse>> =>
  graphqlClient({ preview }).query({ query: GET_LANGUAGES });
//endregion
