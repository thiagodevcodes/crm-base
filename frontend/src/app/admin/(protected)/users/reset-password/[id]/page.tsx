import { UpdateExperienceForm } from "@/modules/experiences/components/updateExperienceForm";
import { PasswordForm } from "@/modules/users/components/passwordUserForm";
import { UpdateUserForm } from "@/modules/users/components/updateUserForm";
import { Metadata } from "next";

export default async function UserPasswordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PasswordForm title="Editar Senha" id={id} />;
}
