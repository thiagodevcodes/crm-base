import Images from "@/components/admin/pages/images";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Imagens",
  description: "Página de visualização de imagens",
};

export default async function ImagesPage() {
  return <Images />;
}
