"use client";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "./apollo-client";
import { seedMockData } from "./mock-data";

const client = getApolloClient();

if (process.env.NODE_ENV === "development") {
  seedMockData(client);
}

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
