"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { canAccess } from "@/shared/utils/canAccess";
import { useParams, useRouter } from "next/navigation";
import { BannerFile, BannerFormData } from "@/modules/banners/types/banner";
import { BannerTable } from "../components/bannersTable";
import { getBannersByCategory, createBanner } from "../services/banners";
import Link from "next/link";

export default function Banners({ id }: { id: string }) {
  const { authenticated, loading, permissions } = useAuth();
  const params = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();
  const [banners, setBanners] = useState<BannerFile[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBannersByCategory(id);
        setBanners(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchBanners();
  }, [id]);

  async function handleSubmit(data: BannerFormData) {
    try {
      if (!data.files?.length) {
        console.error("Nenhuma imagem selecionada");
        return;
      }
      const newBanners = await createBanner(data.files, id);
      console.log("Banners criados:", newBanners);
      setBanners((prev) => [...prev, ...newBanners]);

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

        {canAccess(permissions, ["ADD_BANNER_CATEGORY"]) && (
          <Link
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
            href={"/admin/banners/new/" + params.id}
          >
            Adicionar Banner
          </Link>
        )}
      </div>

      <BannerTable
        banners={banners}
        setBanners={setBanners}
        loadingData={loadingData}
      />
    </div>
  );
}
