"use client";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "./apollo-client";

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={getApolloClient()}>{children}</ApolloProvider>;
}
