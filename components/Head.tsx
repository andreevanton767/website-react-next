import React from 'react';
import NextHead from 'next/head';

import { __SbImageServer__ } from '@/libs/constants';

export interface MetaContent {
  title: string;
  description?: string;
  keywords?: string;
}

const Head = ({ title, description, keywords }: MetaContent): JSX.Element => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || 'YEA Personalize'}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="description" content={description || ''} />
    <meta name="keywords" content={keywords || ''} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script
      defer
      src={
        '//app.storyblok.com/f/storyblok-latest.js?t=BKFRTWedKaTnP3sHlkRQBQtt'
      }
    />
  </NextHead>
);

export default Head;
