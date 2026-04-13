import BannerCategories from "@/modules/banner_categories/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Categorias de Banner",
  description: "Página de visualização de dados",
};

export default async function BannerCategoriesPage() {
  return <BannerCategories />;
}
