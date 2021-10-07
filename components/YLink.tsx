import { HTMLAttributes, useContext } from 'react';
import Link, { LinkProps } from 'next/link';

import { GlobalStateContext } from '@/store/GlobalStateContext';

type Props = LinkProps & HTMLAttributes<HTMLAnchorElement>;

export default function YLink({
  children,
  href,
  ...props
}: Props): JSX.Element {
  // get website context, if present
  // set different processed href for website (SSG) and blog (SSR), to fix website links dropping hostname on locales other than default (en)
  // this is a patch-me-up solution which I don't understand fully but it works
  const { isWebsite } = useContext(GlobalStateContext);

  const processedHref =
    typeof href != 'string' ? href : href.replace('home', '');

  const relativeUrl = isWebsite ? processedHref : `/${processedHref}`;

  return (
    <Link href={relativeUrl} as={relativeUrl} {...props} passHref>
      {children}
    </Link>
  );
}
