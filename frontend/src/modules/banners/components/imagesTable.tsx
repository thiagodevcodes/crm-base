"use client";

import { useState } from "react";
import { ConfirmAlert } from "../../../shared/components/ui/confirmAlert";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { BannerFile } from "@/modules/banners/types/banner";
import Image from "next/image";
import { canAccess } from "@/shared/utils/canAccess";
import r2Loader from "@/shared/utils/r2loader";
import { useBannerContext } from "../contexts/context";
import { Spinner } from "@/shared/components/ui/spinner";

export function BannerTable() {
  const { banners, removeBanner, loading } = useBannerContext();
  const [selectedImage, setSelectedImage] = useState<BannerFile | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { permissions } = useAuth();

  async function handleDelete() {
    if (!selectedImage) return;
    removeBanner(selectedImage.bannerId)
    setConfirmModalOpen(false)
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 w-full">
        <table className="w-full border-collapse text-sm text-white">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Imagem</th>
              {canAccess(permissions, ["DELETE_IMAGE"]) && (
                <th className="px-4 py-3 text-center">Ações</th>
              )}
            </tr>
          </thead>

          <tbody>
            {(loading || banners.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  {banners ? (
                    <Spinner width="30px" height="30px" />
                  ) : (
                    "Nenhum usuário encontrado"
                  )}
                </td>
              </tr>
            )}

            {banners.map((image, index) => (
              <tr
                key={index}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 font-medium">{image.name}</td>
                <td className="px-4 py-3 text-white/80">{image.type}</td>

                <td className="px-4 py-3">
                  <Image
                    loader={r2Loader}
                    src={`${image.url}`}
                    alt={image.name}
                    width={100}
                    height={100}
                  />
                </td>

                {canAccess(permissions, ["DELETE_IMAGE"]) && (
                  <td className="px-4 py-3 text-right flex justify-center">
                    <div className="flex justify-end gap-2">
                      {canAccess(permissions, ["DELETE_IMAGE"]) && (
                        <button
                          onClick={() => {
                            setSelectedImage(image);
                            setConfirmModalOpen(true);
                          }}
                          className="rounded-md bg-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/30 transition cursor-pointer"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {canAccess(permissions, ["DELETE_USER"]) && (
        <ConfirmAlert
          isOpen={confirmModalOpen}
          title="Excluir Imagem"
          message={`Deseja realmente excluir ${selectedImage?.name}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModalOpen(false);
          }}
        />
      )}
    </>
  );
}
