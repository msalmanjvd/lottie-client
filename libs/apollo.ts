// apollo colient
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_SERVER } from "../config/env";

const client = new ApolloClient({
  uri: GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});

export default client;
