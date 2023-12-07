import { CosmosClient } from "@azure/cosmos";

export const CosmosContainer = () => {
  const client = new CosmosClient({
    endpoint: process.env.AZURE_COSMOSDB_ENDPOINT!,
    key: process.env.AZURE_COSMOSDB_KEY!,
  });

  const container = client
    .database(process.env.AZURE_COSMOSDB_DATABASE!)
    .container(process.env.AZURE_COSMOSDB_CONTAINER!);

  return container;
};
