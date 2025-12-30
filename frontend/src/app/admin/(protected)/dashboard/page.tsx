"use client";

import { Spinner } from "@/components/global/spinner";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { authenticated, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!authenticated) return <Spinner />;

  return (
    <div className="">
   
    </div>
  );
}
