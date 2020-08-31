module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      use: ['graphql-tag/loader'],
    });

    return config;
  },
};
