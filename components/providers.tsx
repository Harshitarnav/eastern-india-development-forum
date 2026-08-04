"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { Suspense, useState } from "react";
import { store } from "@/lib/store";
import { AdminShortcut } from "@/components/AdminShortcut";
import { RouteProgress } from "@/components/loading/RouteProgress";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="eidf-theme"
          disableTransitionOnChange
        >
          <AdminShortcut />
          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
