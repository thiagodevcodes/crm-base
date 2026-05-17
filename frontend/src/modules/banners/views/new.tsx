"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FileUploader } from "@/shared/components/ui/file_uploader";
import { useState } from "react";
import { BannerFile, BannerFormData } from "../types/banner";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { createBanner } from "../services/banners";

type Props = {
  title: string;
};

export function NewView({ title }: Props) {
  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BannerFormData>({});

  async function handleFormSubmit(data: BannerFormData) {
    try {
      if (!data.files?.length) {
        console.error("Nenhuma imagem selecionada");
        return;
      }
      await createBanner(data.files, params.id as string);
      router.push("/admin/banners/show/" + params.id);
      router.refresh();
    } catch (err) {
      console.error("Erro ao enviar imagem", err);
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
            <FileUploader
              isMulti
              onFilesSelected={(files) => {
                setValue("files", files);
              }}
            />
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
            href={"/admin/banners/show/" + params.id}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white text-center py-2 rounded disabled:opacity-50 cursor-pointer max-w-60 "
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
