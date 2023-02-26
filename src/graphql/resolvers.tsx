const resolvers = {
  Query: {
    // allQuestions: async () => {
    //   const querySpec = {
    //     query: `SELECT * FROM c`,
    //   };

    //   try {
    //     const { resources: items } = await container.items.query(querySpec).fetchAll();
    //     return items;
    //   } catch (err) {
    //     throw new Error("Error: " + err);
    //   }
    // },
    questionById: async (_: unknown, { id }: { id: string }, { dataSources }: { dataSources: any }) => {
      return await dataSources.questionsDB.getQuestion(id);
    },
  },
};

export default resolvers;
