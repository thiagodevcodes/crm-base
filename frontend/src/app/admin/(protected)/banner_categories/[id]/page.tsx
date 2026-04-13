
import Banners from "@/modules/banners/views";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};


export const metadata: Metadata = {
  title: "CRM - Banners",
  description: "Página de visualização de banners",
};

export default async function BannersPage({ params }: PageProps) {
  const { id } = await params
  return <Banners id={id} />;
}
