"use client";

import { useState } from "react";
import { ConfirmAlert } from "../../../shared/components/ui/confirmAlert";
import { canAccess } from "@/shared/utils/canAccess";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Modal } from "@/shared/components/ui/modal";
import { UpdateBannerCategoryForm } from "./updateBannerCategoryForm";
import { useBannerCategoryContext } from "../contexts/context";
import { Spinner } from "@/shared/components/ui/spinner";
import { BannerCategory } from "../types/bannerCategory";
import Link  from "next/link";

export function BannerCategoryTable() {
  const {
    banner_categories,
    editBannerCategory,
    removeBannerCategory,
    loading,
  } = useBannerCategoryContext();
  const [selectedBannerCategory, setSelectedBannerCategory] =
    useState<BannerCategory | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { permissions } = useAuth();

  async function handleUpdate(data: BannerCategory) {
    if (!selectedBannerCategory) return;

    try {
      editBannerCategory(selectedBannerCategory.bannerCategoryId, data);

      setUpdateModalOpen(false);
      setSelectedBannerCategory(null);
    } catch (err) {
      console.error("Erro ao atualizar usuário", err);
    }
  }

  async function handleDelete() {
    if (!selectedBannerCategory) return;
    removeBannerCategory(selectedBannerCategory.bannerCategoryId);
    setConfirmModalOpen(false);
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 w-full">
        <table className="w-full border-collapse text-sm text-white">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="px-4 py-3">Titulo</th>
              <th className="px-4 py-3">Largura</th>
              <th className="px-4 py-3">Altura</th>
              {(canAccess(permissions, ["UPDATE_BANNER_CATEGORY"]) ||
                canAccess(permissions, ["DELETE_BANNER_CATEGORY"])) && (
                <th className="px-4 py-3 text-center">Ações</th>
              )}
            </tr>
          </thead>

          <tbody>
            {(loading || banner_categories.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  {loading ? (
                    <Spinner width="30px" height="30px" />
                  ) : (
                    "Nenhum categoria de banner encontrada"
                  )}
                </td>
              </tr>
            )}

            {banner_categories.map((banner_category) => (
              <tr
                key={banner_category.bannerCategoryId}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {banner_category.title}
                </td>
                <td className="px-4 py-3 text-white/80">
                  {banner_category.width}
                </td>
                <td className="px-4 py-3 text-white/80">
                  {banner_category.height}
                </td>

                {(canAccess(permissions, ["UPDATE_BANNER_CATEGORY"]) ||
                  canAccess(permissions, ["DELETE_BANNER_CATEGORY"])) && (
                  <td className="px-4 py-3 text-right flex justify-center">
                    <div className="flex justify-end gap-2">
                      {canAccess(permissions, ["UPDATE_BANNER_CATEGORY"]) && (
                        <button
                          onClick={() => {
                            setSelectedBannerCategory(banner_category);
                            setUpdateModalOpen(true);
                          }}
                          className="rounded-md bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-500/30 transition cursor-pointer"
                        >
                          Editar
                        </button>
                      )}

                      {canAccess(permissions, ["DELETE_BANNER_CATEGORY"]) && (
                        <button
                          onClick={() => {
                            setSelectedBannerCategory(banner_category);
                            setConfirmModalOpen(true);
                          }}
                          className="rounded-md bg-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/30 transition cursor-pointer"
                        >
                          Excluir
                        </button>
                      )}
                      
                      {canAccess(permissions, ["GET_BANNERS"]) && (
                        <Link href={`/admin/banner_categories/${banner_category.bannerCategoryId}`} className="rounded-md bg-green-500/20 px-3 py-1 text-xs text-green-400 hover:bg-green-500/30 transition cursor-pointer">
                          Ver Banners
                        </Link>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {canAccess(permissions, ["UPDATE_EXPERIENCE"]) && (
        <Modal
          isOpen={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        >
          <UpdateBannerCategoryForm
            title={`Editar ${selectedBannerCategory?.title}`}
            isOpen={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            onSubmit={handleUpdate}
            selectedBannerCategory={selectedBannerCategory}
          />
        </Modal>
      )}

      {canAccess(permissions, ["DELETE_BANNER_CATEGORY"]) && (
        <ConfirmAlert
          isOpen={confirmModalOpen}
          title="Excluir Categoria de Banner"
          message={`Deseja realmente excluir ${selectedBannerCategory?.title}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModalOpen(false);
          }}
        />
      )}
    </>
  );
}
