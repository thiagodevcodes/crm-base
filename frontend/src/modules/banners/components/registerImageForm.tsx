"use client";

import { useForm } from "react-hook-form";
import { BannerFile, BannerFormData } from "@/modules/banners/types/banner";

type Props = {
  title: string;
  categoryId: string;
  onSubmit: (data: BannerFormData) => Promise<void>; // recebe dados do formulário
  selectedImage?: BannerFile | null;
};

export function RegisterImageForm({ onSubmit, title, categoryId}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BannerFormData>({
    defaultValues: {
      file: undefined,
    },
  });

  async function handleFormSubmit(data: BannerFormData) {
    try {
      console.log(data);
        
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error("Erro ao cadastrar imagem:", err);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Imagem */}
        <div>
          <input
            type="file"
            placeholder="Imagem"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("file", {
              required: "Imagem é obrigatória",
            })}
          />
          {errors.file && (
            <p className="text-red-400 text-sm">{errors.file.message}</p>
          )}
        </div>

        {/* Hidden com categoria */}
        <input
          type="hidden"
          value={categoryId}
          {...register("bannerCategoryId")}
        />

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
