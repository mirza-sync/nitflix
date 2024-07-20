"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
