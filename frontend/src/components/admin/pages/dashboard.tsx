"use client";

import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { canAccess } from "@/utils/canAccess";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { authenticated, loading, permissions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (
      !loading &&
      authenticated &&
      !canAccess(permissions, ["VIEW_DASHBOARD"])
    ) {
      router.replace("/admin/dashboard");
    }
  }, [loading, authenticated, router, permissions]);

  if (loading || !authenticated) return <SpinnerLoading />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo ao painel administrativo!</p>
    </div>
  );
}
