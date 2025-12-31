// app/login/page.tsx
import LoginForm from "@/pages/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Login",
  description: "Página para logar no sistema",
};

export default function LoginPage() {
  return <LoginForm />;
}