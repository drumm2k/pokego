import { ApolloServer, gql } from 'apollo-server-micro';

const eventsData = [
  {
    id: 1,
    name: 'Rayquaza в рейдах',
    desc: 'Rayquaza возвращается, на этот раз с шайни версией.',
    start: 'Feb 31 2020 05:00:00 GMT-0700',
    end: 'Mar 2 2021 05:00:00 GMT-0700',
    img: '/img/pokemon/384.png',
  },
  {
    id: 2,
    name: 'Week 1: Johto Journey',
    desc: 'Ультра бонус, первая неделя.',
    start: 'Mar 2 2020 13:00:00 GMT-0700',
    end: 'Mar 9 2020 13:00:00 GMT-0700',
    img: '/img/pokemon/201-f.png',
  },
  {
    id: 3,
    name: 'Week 2: Global Challenge, Global Hatches',
    desc: 'Ультра бонус, вторая неделя.',
    start: 'Mar 9 2020 13:00:00 GMT-0700',
    end: 'Mar 16 2020 13:00:00 GMT-0700',
    img: '/img/pokemon/83.png',
  },
  {
    id: 4,
    name: 'Week 3: A Unova Unveiling',
    desc: 'Ультра бонус, третья неделя.',
    start: 'Mar 16 2020 13:00:00 GMT-0700',
    end: 'Mar 23 2020 13:00:00 GMT-0700',
    img: '/img/pokemon/286.png',
  },
];

const typeDefs = gql`
  type Event {
    id: ID!
    name: String!
    desc: String!
    start: String!
    end: String!
    img: String!
  }

  type Query {
    getEvents: [Event]!
  }
`;

const resolvers = {
  Query: {
    getEvents(parent, args, context, info) {
      return eventsData;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
