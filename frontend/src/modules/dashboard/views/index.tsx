"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { canAccess } from "@/shared/utils/canAccess";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { useExperiences } from "@/modules/experiences/hooks/useExperiences";
import { useBannerCategories } from "@/modules/banner_categories/hooks/useBannerCategories";

export default function Dashboard() {
  const { authenticated, loading, permissions } = useAuth();
  const { getCountUsers, countUsers } = useUsers();
  const { getCountBannerCategories, countBannerCategories } =
    useBannerCategories();
  const { getCountExperiences, countExperiences } = useExperiences();
  const router = useRouter();

  useEffect(() => {
    getCountExperiences();
    getCountUsers();
    getCountBannerCategories();
  }, []);

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
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Bem-vindo ao painel administrativo!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          <div className="mt-6 p-4 bg-slate-900 text-white rounded-4xl shadow flex items-center gap-4 flex-col">
            <h2 className="text-5xl font-bold">{countUsers}</h2>
            <h3>Usuários</h3>
          </div>

          <div className="mt-6 p-4 bg-slate-900 text-white rounded-4xl shadow flex items-center gap-4 flex-col">
            <h2 className="text-5xl font-bold">{countExperiences}</h2>
            <h3>Experiências</h3>
          </div>

          <div className="mt-6 p-4 bg-slate-900 text-white rounded-4xl shadow flex items-center gap-4 flex-col">
            <h2 className="text-5xl font-bold">{countBannerCategories}</h2>
            <h3>Categorias de Banner</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
