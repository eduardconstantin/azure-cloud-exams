import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient({
  endpoint: process.env.AZURE_COSMOSDB_ENDPOINT!,
  key: process.env.AZURE_COSMOSDB_KEY!,
});

const container = client
  .database(process.env.AZURE_COSMOSDB_DATABASE!)
  .container(process.env.AZURE_COSMOSDB_CONTAINER!);

const resolvers = {
  Query: {
    allQuestions: async () => {
      const querySpec = {
        query: `SELECT * FROM c`,
      };

      try {
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        return items;
      } catch (err) {
        throw new Error("Error: " + err);
      }
    },
    questionById: async (_: unknown, { id }: { id: string }) => {
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
  },
};

export default resolvers;
