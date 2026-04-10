"use client";

import { ApolloProvider } from "@apollo/client";
import { useEffect, useRef } from "react";
import { getApolloClient } from "./apollo-client";
import { seedMockData } from "./mock-data";

const client = getApolloClient();

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  const seeded = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !seeded.current) {
      seedMockData(client);
      seeded.current = true;
    }
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
