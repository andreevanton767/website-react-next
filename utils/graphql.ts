import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

interface IClient {
  preview?: boolean;
}

const clientDefaultArgs = {
  preview: false,
};

/**
 * Returns a graphql client
 *
 * @param preview
 */
export default ({
  preview = false,
}: IClient = clientDefaultArgs): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: 'https://gapi.storyblok.com/v1/api',
    cache: new InMemoryCache(),
    headers: {
      token: process.env.STORYBLOK_TOKEN,
      version: preview ? 'draft' : 'published',
    },
  });
};
