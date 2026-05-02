import { UpdateBannerCategoryForm } from "@/modules/banner_categories/components/updateBannerCategoryForm";
import { UpdateExperienceForm } from "@/modules/experiences/components/updateExperienceForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Categorias de Banner",
  description: "Editar Categoria de Banner",
};

export default async function BannerCategoriesPage({ params }: { params: { id: string } }) {
  return <UpdateBannerCategoryForm title="Editar Categoria de Banner" id={params.id} />;
}
