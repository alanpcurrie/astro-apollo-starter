import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const client = new ApolloClient({
  uri: "https://orange-pebble-006fcd803.4.azurestaticapps.net/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
