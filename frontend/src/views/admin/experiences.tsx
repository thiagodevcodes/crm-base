"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { canAccess } from "@/shared/utils/canAccess";
import { Spinner } from "@/shared/components/ui/spinner";
import { Modal } from "@/shared/components/ui/modal";
import {
  createExperience,
  getExperiences,
} from "@/modules/experiences/services/experiences";
import {
  Experience,
  ExperienceFormData,
} from "@/modules/experiences/types/experiences";
import { RegisterExperienceForm } from "@/modules/experiences/components/registerExperienceForm";
import { ExperiencesTable } from "@/modules/experiences/components/experiencesTable";
import { useExperiences } from "@/modules/experiences/hooks/useExperiences";
import {
  ExperienceProvider,
  useExperienceContext,
} from "@/modules/experiences/contexts/context";

export default function Experiences() {
  const { experiences, addExperience } = useExperienceContext();
  const { authenticated, loading, permissions } = useAuth();
  const [open, setOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(data: ExperienceFormData) {
    try {
      addExperience(data);
      setOpen(false);
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

    if (authenticated && canAccess(permissions, ["GET_EXPERIENCES"])) {
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
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Adicionar Experiência
          </button>
        )}

        {canAccess(permissions, ["ADD_EXPERIENCE"]) && (
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <RegisterExperienceForm
              title="Criar Experiência"
              isOpen={open}
              onClose={() => setOpen(false)}
              onSubmit={handleSubmit}
            />
          </Modal>
        )}
      </div>

      {dataLoading ? (
        <Spinner width="2.5rem" height="2.5rem" />
      ) : (
        experiences && <ExperiencesTable />
      )}
    </div>
  );
}
