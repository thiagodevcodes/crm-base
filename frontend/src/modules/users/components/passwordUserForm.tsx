"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { User, UserFormData } from "../types";
import { useRouter } from "next/navigation";
import { useUserContext } from "../contexts/context";
import Link from "next/link";

type Props = {
  title: string;
  id: string;
};

export function PasswordForm({ title, id }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>();

  const { editPassword, fetchUser } = useUserContext();
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  const password = watch("password");

  useEffect(() => {
    async function load() {
      const data = await fetchUser(id);
      setUserData(data);
    }
    if (id) load();
  }, [id]);

  useEffect(() => {
    if (!userData) return;

    reset({
      name: userData.name,
      username: userData.username,
      password: "",
      confirmPassword: "",
    });
  }, [userData, reset]);

  async function handleFormSubmit(data: UserFormData) {
    try {
      await editPassword(id, data.password);
      reset();
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      console.error("Erro ao editar senha:", err);
    }
  }

  return (
    <div className="px-10">
      <div className="py-8">
        <h1 className="text-2xl font-bold">{title} - {userData?.name}</h1>
        <p>Bem-vindo ao painel de edição de senhas!</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label className="font-bold" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: { value: 6, message: "Mínimo de 6 caracteres" },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="font-bold" htmlFor="confirmPassword">
              Confirmar Senha
            </label>
            <input
              type="password"
              placeholder="Confirmar senha"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("confirmPassword", {
                required: "Confirme a senha",
                validate: (value) =>
                  value === password || "As senhas não coincidem",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-start gap-5 items-center mt-10">
          <button
            disabled={isSubmitting}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer max-w-60"
          >
            {isSubmitting ? "Atualizando..." : "Atualizar"}
          </button>
          <Link
            href={"/admin/users"}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white text-center py-2 rounded disabled:opacity-50 cursor-pointer max-w-60 "
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
