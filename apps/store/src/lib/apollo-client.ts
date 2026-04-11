import {
  ApolloClient,
  InMemoryCache,
  // HttpLink,
  // split,
  type NormalizedCacheObject,
} from "@apollo/client";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { createClient } from "graphql-ws";

function makeClient(): ApolloClient<NormalizedCacheObject> {
  // const httpLink = new HttpLink({
  //   uri:
  //     process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ??
  //     "http://localhost:4000/graphql",
  //   credentials: "include",
  // });

  // const wsLink =
  //   typeof window !== "undefined"
  //     ? new GraphQLWsLink(
  //         createClient({
  //           url:
  //             process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ??
  //             "ws://localhost:4000/graphql",
  //         }),
  //       )
  //     : null;

  // const splitLink = wsLink
  //   ? split(
  //       ({ query }) => {
  //         const definition = getMainDefinition(query);
  //         return (
  //           definition.kind === "OperationDefinition" &&
  //           definition.operation === "subscription"
  //         );
  //       },
  //       wsLink,
  //       httpLink,
  //     )
  //   : httpLink;

  return new ApolloClient({
    // link: splitLink,
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  });
}

let browserClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (typeof window === "undefined") return makeClient();
  if (!browserClient) browserClient = makeClient();
  return browserClient;
}
