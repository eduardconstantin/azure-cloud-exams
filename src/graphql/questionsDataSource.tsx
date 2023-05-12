import { Container } from "@azure/cosmos";

export const QuestionsDataSource = (container: Container) => {
  return {
    async getQuestion(id: string) {
      const querySpec = {
        query: "SELECT * FROM c WHERE c.id = @id",
        parameters: [
          {
            name: "@id",
            value: id,
          },
        ],
      };

      try {
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return items[0];
      } catch (err) {
        throw new Error("Error: " + err);
      }
    },
    async getQuestions() {
      const querySpec = {
        query: "SELECT VALUE COUNT(c.id) FROM c",
      };

      try {
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return { count: items[0] };
      } catch (err) {
        throw new Error("Error: " + err);
      }
    },
  };
};

export const LocalQuestionsDataSource = (container: any) => {
  return {
    async getQuestion(id: string) {
      try {
        return container.filter((el: any) => el.id === id)[0];
      } catch (err) {
        throw new Error("Error: " + err);
      }
    },
    async getQuestions() {
      try {
        return { count: container.length };
      } catch (err) {
        throw new Error("Error: " + err);
      }
    },
  };
};
