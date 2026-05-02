"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { canAccess } from "@/shared/utils/canAccess";
import { Modal } from "@/shared/components/ui/modal";
import { ExperienceFormData } from "@/modules/experiences/types";
import { RegisterExperienceForm } from "@/modules/experiences/components/registerExperienceForm";
import { ExperiencesTable } from "@/modules/experiences/components/experiencesTable";
import { useExperienceContext } from "@/modules/experiences/contexts/context";
import Link from "next/link";

export default function Experiences() {
  const { addExperience } = useExperienceContext();
  const { authenticated, loading, permissions } = useAuth();
  const router = useRouter();

  async function handleSubmit(data: ExperienceFormData) {
    try {
      addExperience(data);
    } catch (err) {
      console.error("Erro ao criar experiência", err);
    }
  }

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (
      !loading &&
      authenticated &&
      !canAccess(permissions, ["GET_EXPERIENCES"])
    ) {
      router.replace("/admin/dashboard");
    }
  }, [loading, authenticated, router, permissions]);

  if (loading || !authenticated || !canAccess(permissions, ["GET_EXPERIENCES"]))
    return <SpinnerLoading />;

  return (
    <div className="p-6 gap-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Experiências</h1>
          <p>Bem-vindo ao painel de Experiências!</p>
        </div>

        {canAccess(permissions, ["ADD_EXPERIENCE"]) && (
          <Link  className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer" href={"/admin/experiences/new"}>
            Adicionar Experiência
          </Link>
        )}
      </div>

      <ExperiencesTable />
    </div>
  );
}
