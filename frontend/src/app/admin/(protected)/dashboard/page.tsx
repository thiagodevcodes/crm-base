import DashboardClient from "@/modules/dashboard/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Dashboard",
  description: "Página de visualização de dados",
};

export default async function DashboardPage() {
  return <DashboardClient />;
}
