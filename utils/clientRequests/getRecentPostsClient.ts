import { RecentPostsRes } from '@/types/blogPost';

import { RecentPostsReqQuery } from '@/types/clientRequests';

export const getRecentPostsClient = async (
  hostname: string,
  {
    current_post = '',
    category = '',
    locale = '',
    num_items = '',
  }: RecentPostsReqQuery
): Promise<RecentPostsRes | null> => {
  const queryString = [
    `?category=${category}`,
    `locale=${locale}`,
    `num_items=${num_items}`,
    `current_post=${current_post}`,
  ].join('&');

  const reqProtocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const url = `${reqProtocol}://${hostname}/api/recentPosts${queryString}`;

  try {
    const res = await (await fetch(url)).json();

    return res;
  } catch (err) {
    console.error(err);

    return null;
  }
};
