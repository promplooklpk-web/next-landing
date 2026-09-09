"use client";

import { CarStoreProvider } from "@/contexts/CarStoreContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CarStoreProvider>{children}</CarStoreProvider>;
}
