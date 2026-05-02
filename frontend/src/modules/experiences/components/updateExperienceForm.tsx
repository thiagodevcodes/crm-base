"use client";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { Experience, ExperienceFormData } from "@/modules/experiences/types";
import { useExperienceContext } from "../contexts/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  id: string;
};

export function UpdateExperienceForm({ title, id }: Props) {
  const { editExperience, fetchExperience } = useExperienceContext();
  const [experienceData, setExperienceData] = useState<Experience | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const data = await fetchExperience(id);
      setExperienceData(data);
    }
    if (id) load();
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExperienceFormData>({
    defaultValues: {
      title: experienceData?.title,
      description: experienceData?.description,
      period: experienceData?.period,
      technologies: experienceData?.technologies,
    },
  });

  useEffect(() => {
    if (experienceData) {
      reset({
        title: experienceData?.title,
        description: experienceData?.description,
        period: experienceData?.period,
        technologies: experienceData?.technologies,
      });
    } else {
      reset();
    }
  }, [experienceData, reset]);

  async function handleFormSubmit(data: ExperienceFormData) {
    try {
      editExperience(id, data);
      reset();
      router.push("/admin/experiences");
      router.refresh();
    } catch (err) {
      console.error("Erro ao atualizar experiência:", err);
    }
  }

  return (
    <div className="px-10">
      <div className="py-8">
          <h1 className="text-2xl font-bold">{title} - {experienceData?.title}</h1>
          <p>Bem-vindo ao painel de Experiências!</p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label className="font-bold" htmlFor="title">Titulo</label>
            <input
              type="text"
              placeholder="Titulo"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("title", {
                required: "Titulo é obrigatório",
              })}
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="font-bold" htmlFor="description">Descrição</label>
            <input
              type="text"
              placeholder="Descrição"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("description", {
                required: "Descrição é obrigatório",
                minLength: {
                  value: 3,
                  message: "Mínimo de 3 caracteres",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-bold" htmlFor="period">Período</label>
            <input
              type="text"
              placeholder="Período"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
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
            <label className="font-bold" htmlFor="technologies">Tecnologias</label>
            <input
              type="text"
              placeholder="Tecnologias"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
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
        </div>

        <div className="flex justify-start gap-5 items-center mt-10">
          <button
            disabled={isSubmitting}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer max-w-60"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
          <Link href={"/admin/experiences"} className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white text-center py-2 rounded disabled:opacity-50 cursor-pointer max-w-60 ">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
