import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@azure-fundamentals/src/graphql/schemas";
import resolvers from "@azure-fundamentals/src/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
