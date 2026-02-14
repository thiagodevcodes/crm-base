"use client";

import { useForm } from "react-hook-form";
import { ImageFormData } from "@/types/image";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ImageFormData) => Promise<void>; // recebe dados do formulário
  selectedImage?: ImageFormData | null;
};

export function RegisterImageModal({ onSubmit, title }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ImageFormData>({
    defaultValues: {
      image: undefined,
    },
  });

  async function handleFormSubmit(data: ImageFormData) {
    try {
      await onSubmit(data); // chama o prop onSubmit do pai
      reset(); // limpa o formulário // fecha o modal
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
            {...register("image", {
              required: "Imagem é obrigatória",
            })}
          />
          {errors.image && (
            <p className="text-red-400 text-sm">{errors.image.message}</p>
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
