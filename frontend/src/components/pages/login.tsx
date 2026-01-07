"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/global/inputField";
import Image from "next/image";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/global/spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SpinnerLoading } from "../global/spinnerLoading";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login, loading, authenticated } = useAuth();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    try {
      await login(data.email, data.password);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError("root", {
            type: "manual",
            message: "Email ou senha incorretos",
          });
          return;
        }

        const backendMessage =
          err.response?.data?.message ?? err.response?.data ?? null;

        setError("root", {
          type: "manual",
          message: backendMessage
            ? String(backendMessage)
            : "Erro de conexão. Verifique sua rede e tente novamente.",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Erro inesperado. Tente novamente.",
        });
      }
    }
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="bg-slate-950 h-full flex justify-center items-center">
        <Image src={"/login.png"} width={550} height={550} alt="" />
      </div>

      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 w-96 px-10 py-10 bg-white rounded-xl shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <div className="flex flex-col gap-2">
            <InputField
              label="Email"
              type="text"
              registerReturn={{ ...register("email") }}
              error={errors.email?.message as string | undefined}
            />
            <InputField
              label="Senha"
              type="password"
              registerReturn={{ ...register("password") }}
              error={errors.password?.message as string | undefined}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-950 transition disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : "Entrar"}
          </button>

          {errors.root && (
            <p className="text-red-500 text-md text-center">
              {errors.root.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}