"use client";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { Experience, ExperienceFormData } from "@/modules/experiences/types/experiences";
import { Role } from "@/modules/roles/types/role";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => Promise<void>; 
  selectedExperience?: Experience | null;
  title: string;
};

export function UpdateExperienceForm({
  isOpen,
  onClose,
  onSubmit,
  selectedExperience,
  title
}: Props) {
  const [roles, setRoles] = useState<Role[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExperienceFormData>({
    defaultValues: {
      title: selectedExperience?.title,
      description: selectedExperience?.description,
      period: selectedExperience?.period,
      technologies: selectedExperience?.technologies,
    },
  });

  useEffect(() => {
    if (selectedExperience) {
      reset({
        title: selectedExperience?.title,
        description: selectedExperience?.description,
        period: selectedExperience?.period,
        technologies: selectedExperience?.technologies,
      });
    } else {
      reset();
    }
  }, [selectedExperience, reset]);

  async function handleFormSubmit(data: ExperienceFormData) {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar experiência:", err);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Título"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("title", {
              required: "Nome é obrigatório",
            })}
          />
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Descrição"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("description", {
              required: "Descrição é obrigatória",
              minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Período"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("period", {
              required: "Tecnologias é obrigatório",
              minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres",
              },
            })}
          />
          {errors.period && (
            <p className="text-red-400 text-sm">{errors.period.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Tecnologias"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("description", {
              required: "Tecnologias é obrigatório",
              minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
