import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { FeaturedPosts, Service } from '@/enums/components';
import { Language } from '@/enums/language';

import { RecentPostsReqQuery } from '@/types/clientRequests';

import { ArticleProps } from '@/components/YLatestArticlesCard';

import { getRecentPostsClient } from '@/utils/clientRequests/getRecentPostsClient';

import { __hostname__ } from '@/libs/constants';

type ReturnArticle = Omit<ArticleProps, 'type'>;

interface RecentPostsHook {
  (params: { location: FeaturedPosts; category: Service | null }): {
    articles: ReturnArticle[] | null;
    fetching: boolean;
  };
}

/**
 * Hook in charge of making client side request for recent posts (going through proxy rather than to CMS directly)
 * Takes in location (on blog post or in service page) and category (category of posts to fetch)
 * Can be halted by passing null as category
 * @param param0 {location, category}
 * @returns recent posts processed as YRecentPostsArticles and fetching state
 */
const useRecentPosts: RecentPostsHook = ({ location, category }) => {
  // control return values
  const [fetching, setFetching] = useState(false);
  const [articles, setArticles] = useState<ReturnArticle[] | null>(null);

  // get post data for FeaturedPosts.BlogPost
  const router = useRouter();

  /**
   * useEffect in charge of fetching, processing and updating articles
   * triggered when "fetching" state changes
   */
  useEffect(() => {
    const updateArticles = async () => {
      if (router) {
        const {
          query: { post },
          locale,
        } = router;

        const postString =
          typeof post === 'string' ? post : Boolean(post) ? post[0] : '';

        // prepare params for client side query to serverless proxy
        const params: RecentPostsReqQuery = {
          category,
          current_post:
            location === FeaturedPosts.BlogPost ? `blog/p/${postString}` : '',
          locale: locale as Language | '',
          num_items: location === FeaturedPosts.BlogPost ? '' : '3',
        };

        // try and get posts from CMS
        try {
          const {
            PostItems: { items },
          } = await getRecentPostsClient(__hostname__, params);

          // process res and set to state
          const processedArticles: ReturnArticle[] = items.map(
            ({ first_published_at, content, slug }) => ({
              ...content,
              firstPublished: first_published_at,
              slug,
            })
          );

          setArticles(processedArticles);
          setFetching(false);
        } catch (err) {
          console.error(err);
          setFetching(false);
        }
      }
    };

    // trigger updateArticles when needed
    if (fetching && router) {
      updateArticles();
    }
  }, [fetching, router]);

  /**
   * In charge of starting fetch when category changes
   */
  useEffect(() => {
    if (Boolean(category) && Boolean(router)) {
      setFetching(true);
    }
  }, [category, router]);

  return { fetching, articles };
};

export default useRecentPosts;
