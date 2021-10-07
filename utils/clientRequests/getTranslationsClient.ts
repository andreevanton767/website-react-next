import { Language } from '@/enums/language';

import { TranslationsReqQuery } from '@/types/clientRequests';
import { TranslationsRes } from '@/types/i18n';

export const getTranslationsClient = async (
  hostname: string,
  { locale = '' }: TranslationsReqQuery
): Promise<TranslationsRes | null> => {
  const queryString =
    typeof locale !== 'string' || ['', Language.UK, 'en'].includes(locale)
      ? ''
      : `?locale=${locale}`;

  const reqProtocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const url = `${reqProtocol}://${hostname}/api/translations${queryString}`;

  try {
    const res = await (await fetch(url)).json();

    return res;
  } catch (err) {
    console.error(err);

    return null;
  }
};
