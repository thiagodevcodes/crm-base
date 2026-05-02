import { RegisterBannerCategoryForm } from "@/modules/banner_categories/components/registerBannerCategoryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Categorias de Banner",
  description: "Cadastro de Categorias de Banner",
};

export default async function BannerCategoriesPage() {
  return <RegisterBannerCategoryForm title="Cadastrar Categoria de Banner" />;
}
