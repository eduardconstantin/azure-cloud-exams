import { fetchQuestions } from "@azure-fundamentals/lib/graphql/repoQuestions";

const resolvers = {
  Query: {
    questions: async (
      _: unknown,
      { link }: { link: string },
      { dataSources }: { dataSources: any },
    ) => {
      const response = await fetchQuestions(link);
      return { count: response?.length };
    },
    questionById: async (
      _: unknown,
      { id, link }: { id: string; link: string },
      { dataSources }: { dataSources: any },
    ) => {
      const response = await fetchQuestions(link);
      return response?.filter((el: any) => el.id === id)[0];
    },
    randomQuestions: async (
      _: unknown,
      { range, link }: { range: number; link: string },
      { dataSources }: { dataSources: any },
    ) => {
      const response = await fetchQuestions(link);
      const shuffled = response?.sort(() => 0.5 - Math.random());
      return shuffled?.slice(0, range);
    },
  },
};

export default resolvers;
