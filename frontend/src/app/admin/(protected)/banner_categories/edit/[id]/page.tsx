import { EditView } from "@/modules/banner_categories/views/edit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Editar Categorias de Banner",
  description: "Editar Categoria de Banner",
};

export default async function BannerCategoriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <EditView title="Editar Categoria de Banner" id={id} />
  );
}
