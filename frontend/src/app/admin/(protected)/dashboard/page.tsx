"use client";

import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { authenticated, loading } = useAuth();

  if (loading) return <SpinnerLoading />;

  if (!authenticated) return <SpinnerLoading />;

  return (
    <div className="">
   
    </div>
  );
}
