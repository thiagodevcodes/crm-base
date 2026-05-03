"use client";

import { useForm } from "react-hook-form";
import { BannerCategoryFormData } from "../types";
import Link from "next/link";
import { useBannerCategoryContext } from "../contexts/context";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
};

export function RegisterBannerCategoryForm({ title }: Props) {
  const { addBannerCategory } = useBannerCategoryContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BannerCategoryFormData>({});

  async function handleFormSubmit(data: BannerCategoryFormData) {
    try {
      await addBannerCategory(data);
      reset();
      router.push("/admin/banner_categories");
      router.refresh();
    } catch (err) {
      console.error("Erro ao cadastrar categoria de banner:", err);
    }
  }

  return (
    <div className="px-10">
      <div className="py-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p>Bem-vindo ao painel de cadastro de Categorias de Banner!</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label className="font-bold" htmlFor="title">
              Titulo
            </label>
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
            <label className="font-bold" htmlFor="width">
              Largura
            </label>
            <input
              type="text"
              placeholder="Largura"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("width", {
                required: "Largura é obrigatório",
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
            <label className="font-bold" htmlFor="height">
              Altura
            </label>
            <input
              type="text"
              placeholder="Altura"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("height", {
                required: "Altura é obrigatório",
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
        </div>

        <div className="flex justify-start gap-5 items-center mt-10">
          <button
            disabled={isSubmitting}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer max-w-60"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
          <Link
            href={"/admin/banner_categories"}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white text-center py-2 rounded disabled:opacity-50 cursor-pointer max-w-60 "
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
