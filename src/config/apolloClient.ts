import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api.amboss.space/graphql",
});

export default client;
