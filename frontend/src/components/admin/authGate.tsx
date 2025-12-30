"use client";

import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/global/spinner";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { loading, authenticated, loggingOut } = useAuth();

  if (loading || loggingOut) {
    return <Spinner />;
  }

  return <>{children}</>;
}