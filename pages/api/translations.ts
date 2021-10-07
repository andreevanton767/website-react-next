import { NextApiRequest, NextApiResponse } from 'next';

import { getTranslations } from '@/libs/api/i18n';

import { Language } from '@/enums/language';

import { TranslationsReqQuery } from '@/types/clientRequests';

import { withCors } from '@/utils/initMiddleware';

/**
 * Small fwd proxy to enable content requests from client (forwards to Sb gql endpoint and returns response)
 * @param req
 * @param res
 * @returns
 */
const translations = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { locale },
  } = (req as unknown) as { query: TranslationsReqQuery };
  await withCors(req, res);

  // check and prepare lang
  const lang =
    !locale || !Object.values(Language).includes(locale as Language)
      ? ''
      : `${locale}/`;

  const monthsId = `${lang}translations/months`;
  const categoriesId = `${lang}translations/categories`;

  const { data } = await getTranslations({
    preview: false,
    monthsId,
    categoriesId,
  });

  const translationsRes = JSON.stringify(data);

  res.setHeader('Content-Type', 'application/json');
  res.end(translationsRes);

  return;
};

export default translations;
