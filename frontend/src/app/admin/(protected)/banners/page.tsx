import Images from "@/views/admin/banners";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Banners",
  description: "Página de visualização de banners",
};

export default async function BannersPage() {
  return <Images />;
}
