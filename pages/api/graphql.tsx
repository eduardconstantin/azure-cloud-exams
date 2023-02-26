import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@azure-fundamentals/src/graphql/schemas";
import resolvers from "@azure-fundamentals/src/graphql/resolvers";
import { CosmosContainer } from "@azure-fundamentals/src/graphql/cosmos-client";
import { QuestionsDataSource, LocalQuestionsDataSource } from "@azure-fundamentals/src/graphql/questionsDataSource";
import qdb from "@azure-fundamentals/src/qdb.json";

interface ContextValue {
  dataSources: {
    questionsDB: BaseContext;
  };
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
});

export default startServerAndCreateNextHandler(server, {
  context: async () => {
    return {
      dataSources: {
        questionsDB: process.env.AZURE_COSMOSDB_ENDPOINT
          ? QuestionsDataSource(CosmosContainer())
          : LocalQuestionsDataSource(qdb),
      },
    };
  },
});
