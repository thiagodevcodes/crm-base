"use client";

import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { authenticated, loading } = useAuth();

  if (loading) return <SpinnerLoading />;

  if (!authenticated) return <SpinnerLoading />; // ou redirect client-side

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo ao painel administrativo!</p>
    </div>
  );
}