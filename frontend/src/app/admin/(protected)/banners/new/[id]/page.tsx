
import { NewView } from "@/modules/banners/views/new";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Cadastrar Categoria de Banner",
  description: "Cadastro de Categoria de Banner",
};

export default async function BannerCategoriesPage() {
  return <NewView title="Cadastrar Categoria de Banner" />;
}
