"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { delay } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/user";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function RegisterModal({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const password = watch("password");

  async function onSubmit(data: FormData) {
    const res = await createUser(data.name, data.email, data.password);

    if (res.success) {
      alert("Usuário criado com sucesso!");
    } else {
      alert("Erro ao criar usuário!");
    }

    reset();
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-sm bg-slate-950 p-6 rounded-xl shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Cadastrar Usuário
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Nome */}
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full p-2 rounded bg-slate-800 text-white"
                  {...register("name", {
                    required: "Nome é obrigatório",
                  })}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded bg-slate-800 text-white"
                  {...register("email", {
                    required: "Email é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Mínimo de 3 caracteres",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Senha */}
              <div>
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full p-2 rounded bg-slate-800 text-white"
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "Mínimo de 6 caracteres",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirmação */}
              <div>
                <input
                  type="password"
                  placeholder="Confirmar senha"
                  className="w-full p-2 rounded bg-slate-800 text-white"
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

              <button
                disabled={isSubmitting}
                className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
