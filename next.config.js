module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['yeaimages.s3.eu-central-1.amazonaws.com'],
  },
};
