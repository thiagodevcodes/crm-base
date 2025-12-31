import DashboardClient from "@/pages/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Dashboard",
  description: "Página de visualização de dados",
};

export default function DashboardPage() {
  // Aqui você pode fazer fetch server-side se precisar
  // Ex: dados iniciais ou verificações via cookies

  return <DashboardClient />;
}