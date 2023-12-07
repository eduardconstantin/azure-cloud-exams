// import { CosmosContainer } from "@azure-fundamentals/src/graphql/cosmos-client";
// import { QuestionsDataSource, LocalQuestionsDataSource } from "@azure-fundamentals/src/graphql/questionsDataSource";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@azure-fundamentals/lib/graphql/schemas";
import resolvers from "@azure-fundamentals/lib/graphql/resolvers";
import { RepoQuestionsDataSource } from "@azure-fundamentals/lib/graphql/questionsDataSource";
import { FetchQuestions } from "@azure-fundamentals/lib/graphql/repoQuestions";

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

const questions = await FetchQuestions();

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    return {
      dataSources: {
        // questionsDB: process.env.AZURE_COSMOSDB_ENDPOINT
        //   ? QuestionsDataSource(CosmosContainer())
        //   : LocalQuestionsDataSource(questions),
        questionsDB: RepoQuestionsDataSource(questions),
      },
    };
  },
});

export { handler as GET, handler as POST };
