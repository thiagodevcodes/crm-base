import Home from "@/views/website/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Home",
  description: "Página inicial do sistema",
};

export default async function HomePage() {
  return <Home />;
}
