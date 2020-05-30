import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    getHello: String
  }
`;

const resolvers = {
  Query: {
    getHello(parent, args, context, info) {
      return 'hello';
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
