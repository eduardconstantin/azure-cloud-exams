// import { CosmosContainer } from "@azure-fundamentals/src/graphql/cosmos-client";
// import { QuestionsDataSource, LocalQuestionsDataSource } from "@azure-fundamentals/src/graphql/questionsDataSource";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from "@azure-fundamentals/src/graphql/schemas";
import resolvers from "@azure-fundamentals/src/graphql/resolvers";
import { RepoQuestionsDataSource } from "@azure-fundamentals/src/graphql/questionsDataSource";
import { FetchQuestions } from "@azure-fundamentals/src/graphql/repoQuestions";

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

export default startServerAndCreateNextHandler(server, {
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
