module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    GRAPHQL_ENDPOINT: 'http://localhost:4000',
  },
};
