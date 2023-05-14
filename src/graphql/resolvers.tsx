const resolvers = {
  Query: {
    questions: async (_: unknown, __: unknown, { dataSources }: { dataSources: any }) => {
      return await dataSources.questionsDB.getQuestions();
    },
    questionById: async (_: unknown, { id }: { id: string }, { dataSources }: { dataSources: any }) => {
      return await dataSources.questionsDB.getQuestion(id);
    },
  },
};

export default resolvers;
