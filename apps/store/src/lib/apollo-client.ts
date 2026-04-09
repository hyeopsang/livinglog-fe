import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  type NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

function makeClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? "http://localhost:4000/graphql",
  });

  // JWT를 Authorization 헤더에 주입
  const authLink = setContext((_, { headers }) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  // WebSocket link는 브라우저 환경에서만 생성 (SSR 제외)
  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url:
              process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ?? "ws://localhost:4000/graphql",
            connectionParams: () => {
              const token = localStorage.getItem("accessToken");
              return token ? { authorization: `Bearer ${token}` } : {};
            },
          })
        )
      : null;

  // Subscription → wsLink, 나머지 → authLink + httpLink
  const splitLink = wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  });
}

// 브라우저: 싱글톤 / 서버: 요청마다 새 인스턴스
let browserClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (typeof window === "undefined") return makeClient();
  if (!browserClient) browserClient = makeClient();
  return browserClient;
}
