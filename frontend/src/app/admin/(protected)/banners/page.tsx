import Images from "@/views/admin/banners";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Imagens",
  description: "Página de visualização de imagens",
};

export default async function BannersPage() {
  return <Images />;
}
