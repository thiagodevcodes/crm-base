"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/inputField";
import Image from "next/image";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { delay } from "@/utils/functions";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(2, "A senha deve ter no mínimo 2 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      await delay(1000); // ⏳ 0.5s de delay
      try {
        const res = await axios.get("http://localhost:8080/auth/me", {
          withCredentials: true,
        });

        console.log(res)

        if (res.status === 200) {
          setAuthenticated(true);
          router.push("/admin/dashboard"); 
        } else {
          setAuthenticated(false);
          router.push("/admin"); // redireciona se não autenticado
        }
      } catch (err) {
        setAuthenticated(false);
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    axios.defaults.withCredentials = true; // idealmente setar fora do submit

    try {
      const response = await axios.post("http://localhost:8080/auth/sign_in", {
        username: data.email,
        password: data.password,
      });

      // se chegou aqui, status foi 2xx
      if (response.status === 200) {
        router.push("/admin/dashboard");
        return;
      }

      // caso queira um fallback (normalmente não é necessário porque 4xx/5xx vai pro catch)
      setError("root", {
        type: "manual",
        message: "Erro inesperado. Tente novamente.",
      });
    } catch (err) {
      // tipagem segura para axios
      const error = err as AxiosError<any>;

      // Erro de autenticação
      if (error.response?.status === 401) {
        setError("root", {
          type: "manual",
          message: "Email ou senha incorretos",
        });
        return;
      }

      // caso o backend envie uma mensagem específica no body
      const backendMessage =
        error.response?.data?.message || error.response?.data || null;
      if (backendMessage) {
        setError("root", {
          type: "manual",
          message: String(backendMessage),
        });
        return;
      }

      // Erro de rede ou outro
      setError("root", {
        type: "manual",
        message: "Erro de conexão. Verifique sua rede e tente novamente.",
      });
    }
  }

  if (loading) return <Spinner />;
  
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
              type="text"
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
