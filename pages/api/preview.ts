import graphqlClient from '@/utils/graphql';
import { gql } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { slug } = req.query;

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.STORYBLOK_TOKEN || !slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const page = await graphqlClient({ preview: true }).query({
    query: gql`
        query {
            ContentNode(id: "${slug}") {
                slug
                path
            }
        }
    `,
  });

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  let newSlug = '';
  const locales = ['en', 'nl'];
  let locale = '';

  const slugHasLocale = locales.some((loc) => slug.includes(`${loc}/`));

  if (!slugHasLocale) {
    newSlug = `en/${typeof slug === 'string' ? slug : slug.join('')}`;
  } else {
    Object.values(locales).forEach((loc) => {
      const matchingValue = `${loc}/`;

      if (!slug.includes(matchingValue)) {
        return;
      }

      locale = loc;
      newSlug = typeof slug === 'string' ? slug : slug.join('');
      // .replace(
      //   matchingValue,
      //   ''
      // );
      /**@Note Why would you do this?? */
      /** Additional @NOTE Wouldn't slug always be a string in this case(preview)? */
      return;
    });
  }

  const isHomepage = slug === `${locale}/home` || slug === 'home';
  const Location = `/${isHomepage ? locale || 'en' : newSlug}`;

  // Redirect to the path from the fetched post
  // We don't redirect to slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location });
  res.end();
}
