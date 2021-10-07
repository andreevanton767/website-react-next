import { NextApiRequest, NextApiResponse } from 'next';

import { getRecentPosts } from '@/libs/api/post';

import { Service } from '@/enums/components';
import { Language } from '@/enums/language';

import { RecentPostsReqQuery } from '@/types/clientRequests';

import { withCors } from '@/utils/initMiddleware';

/**
 * Small fwd proxy to enable content requests from client (forwards to Sb gql endpoint and returns response)
 * @param req
 * @param res
 * @returns
 */
const recentPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { category, current_post, locale, num_items },
  } = (req as unknown) as { query: RecentPostsReqQuery };

  await withCors(req, res);

  // check and prepare category
  if (
    !category ||
    typeof category !== 'string' ||
    !Object.values(Service).includes(category)
  ) {
    res.writeHead(404, 'Invalid category provided');
    res.end();
    return;
  }

  // check and prepare lang
  const lang =
    !locale ||
    typeof locale != 'string' ||
    !Object.values(Language).includes(locale as Language)
      ? ''
      : `${locale}/`;

  // chack and prepare limit
  const limit = Number(num_items) || undefined;

  // check and prepare exclude
  const exclude =
    !current_post || typeof current_post !== 'string'
      ? undefined
      : current_post;

  const { data } = await getRecentPosts({
    preview: false,
    category,
    lang,
    limit,
    exclude,
  });

  const itemsRes = JSON.stringify(data);

  res.setHeader('Content-Type', 'application/json');
  res.end(itemsRes);

  return;
};

export default recentPosts;
