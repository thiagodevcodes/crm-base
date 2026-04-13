"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { canAccess } from "@/shared/utils/canAccess";
import { Modal } from "@/shared/components/ui/modal";
import { ExperiencesTable } from "@/modules/experiences/components/experiencesTable";
import { useBannerCategoryContext } from "@/modules/banner_categories/contexts/context";
import { BannerCategoryFormData } from "@/modules/banner_categories/types/bannerCategory";
import { RegisterBannerCategoryForm } from "@/modules/banner_categories/components/registerBannerCategoryForm";
import { BannerCategoryTable } from "@/modules/banner_categories/components/bannerCategoryTable";

export default function BannerCategories() {
  const { addBannerCategory } = useBannerCategoryContext();
  const { authenticated, loading, permissions } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(data: BannerCategoryFormData) {
    try {
      addBannerCategory(data);
      setOpen(false);
    } catch (err) {
      console.error("Erro ao criar categoria de banner", err);
    }
  }

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

  if (loading || !authenticated || !canAccess(permissions, ["GET_BANNER_CATEGORIES"]))
    return <SpinnerLoading />;

  return (
    <div className="p-6 gap-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Categorias de Banner</h1>
          <p>Bem-vindo ao painel de Categorias de Banner!</p>
        </div>

        {canAccess(permissions, ["ADD_BANNER_CATEGORY"]) && (
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Adicionar Categoria de Banner
          </button>
        )}

        {canAccess(permissions, ["ADD_EXPERIENCE"]) && (
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <RegisterBannerCategoryForm
              title="Criar Experiência"
              onSubmit={handleSubmit}
            />
          </Modal>
        )}
      </div>

      <BannerCategoryTable />
    </div>
  );
}
