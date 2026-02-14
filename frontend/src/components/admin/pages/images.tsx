"use client";

import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { canAccess } from "@/utils/canAccess";
import { useRouter } from "next/navigation";
import { Modal } from "../../global/modal";
import { Spinner } from "@/components/global/spinner";
import { getImages, uploadImage } from "@/services/images";
import { RegisterImageModal } from "../ui/image/registerImageModal";
import { ImageFile, ImageFormData } from "@/types/image";
import { ImageTable } from "../ui/image/imagesTable";

export default function Images() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const { authenticated, loading, permissions } = useAuth();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function loadImages() {
    setDataLoading(true);
    const res = await getImages();
    setImages(res);
    setDataLoading(false);
  }

  async function handleSubmit(data: ImageFormData) {
    try {
      if (!data.image || data.image.length === 0) {
        console.error("Nenhuma imagem selecionada");
        return;
      }

      const file = data.image[0]; // pega o primeiro arquivo
      const uploadedFileName = await uploadImage(file); // await aqui!

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

    if (authenticated && canAccess(permissions, ["GET_IMAGES"])) {
      loadImages();
    }
  }, [loading, authenticated, router, permissions]);

  if (loading || !authenticated || !canAccess(permissions, ["GET_IMAGES"]))
    return <SpinnerLoading />;

  return (
    <div className="p-6 gap-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Imagens</h1>
          <p>Bem-vindo ao painel de Imagens!</p>
        </div>

        {canAccess(permissions, ["ADD_IMAGE"]) && (
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Adicionar Imagem
          </button>
        )}
      </div>

      {canAccess(permissions, ["ADD_IMAGE"]) && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <RegisterImageModal
            title="Criar Imagem"
            isOpen={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}

      {dataLoading ? (
        <Spinner width="2.5rem" height="2.5rem" />
      ) : (
        images && <ImageTable images={images} setImages={setImages} />
      )}
    </div>
  );
}
