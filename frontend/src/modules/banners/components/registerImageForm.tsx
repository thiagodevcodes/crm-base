"use client";

import { useForm } from "react-hook-form";

import {
  BannerFile,
  BannerFormData,
} from "@/modules/banners/types/banner";

import { FileUploader } from "@/shared/components/ui/file_uploader";

type Props = {
  title: string;
  categoryId: string;
  onSubmit: (data: BannerFormData) => Promise<void>;
  selectedImage?: BannerFile | null;
};

export function RegisterImageForm({
  onSubmit,
  title,
  categoryId,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BannerFormData>({
    defaultValues: {
      files: [],
      bannerCategoryId: categoryId,
    },
  });

  async function handleFormSubmit(data: BannerFormData) {
    try {
      await onSubmit(data);

      reset();
    } catch (err) {
      console.error("Erro ao cadastrar imagem:", err);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        {title}
      </h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FileUploader
          isMulti
          onFilesSelected={(files) => {
            setValue("files", files);
          }}
        />

        <input
          type="hidden"
          value={categoryId}
          {...register("bannerCategoryId")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}