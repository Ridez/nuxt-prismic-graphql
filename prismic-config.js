import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

export const initPrismic = new ApolloClient({
  link: PrismicLink({
    uri: "https://your-repository-name.prismic.io/graphql",
  }),
  cache: new InMemoryCache()
});