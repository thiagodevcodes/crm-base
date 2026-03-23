"use client";

import { useState } from "react";
import { ConfirmAlert } from "../../../shared/components/ui/confirmAlert";
import { canAccess } from "@/shared/utils/canAccess";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Modal } from "@/shared/components/ui/modal";
import { Experience } from "@/modules/experiences/types/experiences";
import { UpdateExperienceForm } from "./updateExperienceForm";
import { useExperienceContext } from "../contexts/context";
import { Spinner } from "@/shared/components/ui/spinner";

export function ExperiencesTable() {
  const { experiences, editExperience, removeExperience, loading } = useExperienceContext();
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { permissions } = useAuth();

  async function handleUpdate(data: Experience) {
    if (!selectedExperience) return;

    try {
      editExperience(selectedExperience.experienceId, data);

      setUpdateModalOpen(false);
      setSelectedExperience(null);
    } catch (err) {
      console.error("Erro ao atualizar usuário", err);
    }
  }

  async function handleDelete() {
    if (!selectedExperience) return;
    removeExperience(selectedExperience.experienceId)
    setConfirmModalOpen(false)
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 w-full">
        <table className="w-full border-collapse text-sm text-white">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="px-4 py-3">Titulo</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="px-4 py-3">Período</th>
              {(canAccess(permissions, ["UPDATE_EXPERIENCE"]) ||
                canAccess(permissions, ["DELETE_EXPERIENCE"])) && (
                <th className="px-4 py-3 text-center">Ações</th>
              )}
            </tr>
          </thead>

          <tbody>
            {(loading || experiences.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  {loading ? (
                    <Spinner width="30px" height="30px" />
                  ) : (
                    "Nenhum usuário encontrado"
                  )}
                </td>
              </tr>
            )}

            {experiences.map((experience) => (
              <tr
                key={experience.experienceId}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 font-medium">{experience.title}</td>
                <td className="px-4 py-3 text-white/80">
                  {experience.description}
                </td>
                <td className="px-4 py-3 text-white/80">{experience.period}</td>

                {(canAccess(permissions, ["UPDATE_EXPERIENCE"]) ||
                  canAccess(permissions, ["DELETE_EXPERIENCE"])) && (
                  <td className="px-4 py-3 text-right flex justify-center">
                    <div className="flex justify-end gap-2">
                      {canAccess(permissions, ["UPDATE_EXPERIENCE"]) && (
                        <button
                          onClick={() => {
                            setSelectedExperience(experience);
                            setUpdateModalOpen(true);
                          }}
                          className="rounded-md bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-500/30 transition cursor-pointer"
                        >
                          Editar
                        </button>
                      )}

                      {canAccess(permissions, ["DELETE_EXPERIENCE"]) && (
                        <button
                          onClick={() => {
                            setSelectedExperience(experience);
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

      {canAccess(permissions, ["UPDATE_EXPERIENCE"]) && (
        <Modal
          isOpen={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        >
          <UpdateExperienceForm
            title={`Editar ${selectedExperience?.title}`}
            isOpen={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            onSubmit={handleUpdate}
            selectedExperience={selectedExperience}
          />
        </Modal>
      )}

      {canAccess(permissions, ["DELETE_EXPERIENCE"]) && (
        <ConfirmAlert
          isOpen={confirmModalOpen}
          title="Excluir Experiência"
          message={`Deseja realmente excluir ${selectedExperience?.title}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModalOpen(false);
          }}
        />
      )}
    </>
  );
}
