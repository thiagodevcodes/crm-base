"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/inputField";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    console.log("Enviando...", data);
  }

  return (
    <div className="grid lg:grid-cols-2">
      <div className="bg-blue-800 h-dvh flex justify-center items-center">
        <Image src={"/sos-logo.svg"} width={550} height={550} alt=""></Image>
      </div>

      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 w-96 px-10 py-10 bg-white rounded-xl shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <div className="flex flex-col gap-2">
            <InputField
              label={"Email"}
              type="email"
              registerReturn={{ ...register("email") }}
              error={errors.email?.message as string | undefined}
            />
            <InputField
              label={"Senha"}
              type="password"
              registerReturn={{ ...register("password") }}
              error={errors.password?.message as string | undefined}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-800 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>

    </div>
  );
}
