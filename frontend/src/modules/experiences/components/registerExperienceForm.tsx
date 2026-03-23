"use client";

import { useForm } from "react-hook-form";
import {
  ExperienceFormData,
} from "@/modules/experiences/types/experiences";

type Props = {
  title: string;
  onSubmit: (data: ExperienceFormData) => Promise<void>;
};

export function RegisterExperienceForm({
  onSubmit,
  title,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExperienceFormData>({});

  async function handleFormSubmit(data: ExperienceFormData) {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error("Erro ao cadastrar experiência:", err);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Titulo"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("title", {
              required: "Titulo é obrigatório",
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
              required: "Descrição é obrigatório",
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
              required: "Periodo é obrigatório",
              minLength: {
                value: 6,
                message: "Mínimo de 6 caracteres",
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
            {...register("technologies", {
              required: "Tecnologias é obrigatório",
              minLength: {
                value: 6,
                message: "Mínimo de 6 caracteres",
              },
            })}
          />
          {errors.technologies && (
            <p className="text-red-400 text-sm">
              {errors.technologies.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
