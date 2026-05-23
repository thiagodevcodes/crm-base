"use client";

import { useState } from "react";
import { ConfirmAlert } from "../../../shared/components/ui/confirmAlert";
import { canAccess } from "@/shared/utils/canAccess";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Spinner } from "@/shared/components/ui/spinner";
import { BannerCategory } from "../types";
import Link from "next/link";

interface BannerCategoryTableProps {
  data: BannerCategory[];
  loadingData?: boolean;
  onDelete: (id: string) => void;
}

export function BannerCategoryTable({
  data,
  loadingData,
  onDelete,
}: BannerCategoryTableProps) {
  const [selectedBannerCategory, setSelectedBannerCategory] =
    useState<BannerCategory | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { permissions } = useAuth();

  async function handleDelete() {
    if (!selectedBannerCategory) return;
    onDelete(selectedBannerCategory.bannerCategoryId);
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
            {loadingData ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  <Spinner width="30px" height="30px" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  Nenhuma categoria de banner encontrada
                </td>
              </tr>
            ) : (
              data.map((banner_category) => (
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
                          <Link
                            href={`/admin/banner_categories/edit/${banner_category.bannerCategoryId}`}
                          >
                            <button className="rounded-md bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-500/30 transition cursor-pointer">
                              Editar
                            </button>
                          </Link>
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

                        {canAccess(permissions, ["UPDATE_BANNER_CATEGORY"]) && (
                          <Link
                            href={`/admin/banners/show/${banner_category.bannerCategoryId}`}
                          >
                            <button className="rounded-md bg-green-500/20 px-3 py-1 text-xs text-green-400 hover:bg-green-500/30 transition cursor-pointer">
                              Visualizar
                            </button>
                          </Link>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
