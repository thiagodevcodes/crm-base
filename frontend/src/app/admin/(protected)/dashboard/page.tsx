import DashboardClient from "@/components/pages/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Dashboard",
  description: "Página de visualização de dados",
};

export default function DashboardPage() {
  return <DashboardClient />;
}