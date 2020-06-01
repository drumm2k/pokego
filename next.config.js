module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    // API: 'http://localhost:4000/graphql',
    API: 'https://pokego-graphql.herokuapp.com/graphql',
  },
};
