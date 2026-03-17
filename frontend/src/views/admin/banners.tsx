"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { canAccess } from "@/shared/utils/canAccess";
import { useRouter } from "next/navigation";
import { Modal } from "../../shared/components/ui/modal";
import { Spinner } from "@/shared/components/ui/spinner";
import { getBanners, uploadFile } from "@/modules/images/services/images";
import { RegisterImageForm } from "../../modules/images/components/registerImageForm";
import { BannerFile, ImageFormData } from "@/modules/images/types/image";
import { BannerTable } from "../../modules/images/components/imagesTable";

export default function Banners() {
  const [banners, setBanners] = useState<BannerFile[]>([]);
  const { authenticated, loading, permissions } = useAuth();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function loadImages() {
    setDataLoading(true);
    const res = await getBanners();
    setBanners(res);
    setDataLoading(false);
  }

  async function handleSubmit(data: ImageFormData) {
    try {
      if (!data.image || data.image.length === 0) {
        console.error("Nenhuma imagem selecionada");
        return;
      }

      const file = data.image[0]; // pega o primeiro arquivo
      const uploadedFileName = await uploadFile(file); // await aqui!

      if (!uploadedFileName) {
        console.error("Erro ao enviar imagem");
        return;
      }

      loadImages(); // recarrega a lista de imagens após upload

      setOpen(false); // fecha o modal após upload
      console.log("Imagem enviada com sucesso:", uploadedFileName);
    } catch (err) {
      console.error("Erro ao enviar imagem", err);
    }
  }

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (!loading && authenticated && !canAccess(permissions, ["GET_USERS"])) {
      router.replace("/admin/dashboard");
    }

    if (authenticated && canAccess(permissions, ["GET_BANNERS"])) {
      loadImages();
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
          <RegisterImageForm
            title="Criar Banner"
            isOpen={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}

      {dataLoading ? (
        <Spinner width="2.5rem" height="2.5rem" />
      ) : (
        banners && <BannerTable banners={banners} setBanners={setBanners} />
      )}
    </div>
  );
}
