"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { canAccess } from "@/shared/utils/canAccess";
import { useRouter } from "next/navigation";
import { BannerFormData } from "@/modules/banners/types/banner";
import { useBannerContext } from "@/modules/banners/contexts/context";
import { RegisterImageForm } from "../components/registerImageForm";
import { Modal } from "@/shared/components/ui/modal";
import { BannerTable } from "../components/bannersTable";

export default function Banners({ id }: { id: string }) {
  const { addBanner, fetchBannersByCategory } = useBannerContext();
  const { authenticated, loading, permissions } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(id);
    fetchBannersByCategory(id);
  }, [])

  async function handleSubmit(data: BannerFormData) {
    try {
      if (!data) {
        console.error("Nenhuma imagem selecionada");
        return;
      }

      await addBanner(data);
      setOpen(false);
      console.log("Imagem enviada com sucesso:", data);
    } catch (err) {
      console.error("Erro ao enviar imagem", err);
    }
  }

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (!loading && authenticated && !canAccess(permissions, ["GET_USERS"])) {
      router.replace("/admin/dashboard");
    }
  }, [loading, authenticated, router, permissions]);

  if (loading || !authenticated || !canAccess(permissions, ["GET_BANNERS"]))
    return <SpinnerLoading />;

  return (
    <div className="p-6 gap-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Banners</h1>
          <p>Bem-vindo ao painel de Banners!</p>
        </div>

        {canAccess(permissions, ["ADD_BANNER"]) && (
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Adicionar Banner
          </button>
        )}
      </div>

      {canAccess(permissions, ["ADD_BANNER"]) && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <RegisterImageForm title="Criar Banner" categoryId={id} onSubmit={handleSubmit} />
        </Modal>
      )}

      <BannerTable />
    </div>
  );
}
