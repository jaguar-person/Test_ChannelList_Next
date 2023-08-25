import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: process.env.URI,
});

export default client;
