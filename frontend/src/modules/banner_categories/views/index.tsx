"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { canAccess } from "@/shared/utils/canAccess";
import { BannerCategoryTable } from "@/modules/banner_categories/components/bannerCategoryTable";
import Link from "next/link";
import { useBannerCategories } from "../hooks/useBannerCategories";

export default function BannerCategories() {
  const { banner_categories, loadingData, removeBannerCategory } =
    useBannerCategories();
  const { authenticated, loading, permissions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (
      !loading &&
      authenticated &&
      !canAccess(permissions, ["GET_BANNER_CATEGORIES"])
    ) {
      router.replace("/admin/dashboard");
    }
  }, [loading, authenticated, router, permissions]);

  if (
    loading ||
    !authenticated ||
    !canAccess(permissions, ["GET_BANNER_CATEGORIES"])
  )
    return <SpinnerLoading />;

  return (
    <div className="p-6 gap-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Categorias de Banner</h1>
          <p>Bem-vindo ao painel de Categorias de Banner!</p>
        </div>

        {canAccess(permissions, ["ADD_BANNER_CATEGORY"]) && (
          <Link
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
            href={"/admin/banner_categories/new"}
          >
            Adicionar Categoria de Banner
          </Link>
        )}
      </div>

      <BannerCategoryTable
        data={banner_categories}
        loadingData={loadingData}
        onDelete={removeBannerCategory}
      />
    </div>
  );
}
