import Home from "@/website/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Página inicial do sistema",
};

export default async function HomePage() {
  return <Home />;
}
