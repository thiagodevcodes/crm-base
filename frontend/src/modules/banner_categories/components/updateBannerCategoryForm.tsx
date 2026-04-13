"use client";

import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { BannerCategory, BannerCategoryFormData } from "../types/bannerCategory";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BannerCategoryFormData) => Promise<void>; 
  selectedBannerCategory?: BannerCategory | null;
  title: string;
};

export function UpdateBannerCategoryForm({
  onSubmit,
  selectedBannerCategory,
  title
}: Props) {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BannerCategoryFormData>({
    defaultValues: {
      title: selectedBannerCategory?.title,
      width: selectedBannerCategory?.width,
      height: selectedBannerCategory?.height,
    },
  });

  useEffect(() => {
    if (selectedBannerCategory) {
      reset({
        title: selectedBannerCategory?.title,
        width: selectedBannerCategory?.width,
        height: selectedBannerCategory?.height,
      });
    } else {
      reset();
    }
  }, [selectedBannerCategory, reset]);

  async function handleFormSubmit(data: BannerCategoryFormData) {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error("Erro ao atualizar categoria de banner:", err);
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
            placeholder="Largura"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("width", {
              required: "Largura é obrigatória",
              minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres",
              },
            })}
          />
          {errors.width && (
            <p className="text-red-400 text-sm">{errors.width.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Altura"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("height", {
              required: "Altura é obrigatória",
              minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres",
              },
            })}
          />
          {errors.height && (
            <p className="text-red-400 text-sm">{errors.height.message}</p>
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
