"use client";
import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from "@tanstack/react-query";

import React from "react";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return <QCProvider client={queryClient}>{children}</QCProvider>;
}
