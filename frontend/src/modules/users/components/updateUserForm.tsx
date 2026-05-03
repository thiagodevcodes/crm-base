"use client";

import { Controller, useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { useEffect, useState } from "react";

import { User, UserFormData } from "../types";
import { getRoles } from "@/modules/roles/services/role";
import { Role, RoleOption } from "@/modules/roles/types";
import { useRouter } from "next/navigation";
import { useUserContext } from "../contexts/context";
import Link from "next/link";

type Props = {
  title: string;
  id: string;
};

export function UpdateUserForm({ title, id }: Props) {
  const { editUser, fetchUser } = useUserContext();
  const [roles, setRoles] = useState<Role[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const data = await fetchUser(id);
      setUserData(data);
    }
    if (id) load();
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      username: "",
      roles: [],
    },
  });

  const roleOptions: RoleOption[] = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  useEffect(() => {
    if (!userData) return;

    reset({
      name: userData.name,
      username: userData.username,
      roles: userData.roles.map((role) => ({
        value: role.name,
        label: role.name,
      })),
    });
  }, [userData, reset]);

  async function handleFormSubmit(data: UserFormData) {
    try {
      await editUser(id, data);
      reset();
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
    }
  }

  const darkSelectStyles: StylesConfig<RoleOption, true> = {
    control: (base, state) => ({
      ...base,
      boxShadow: "none",
      marginTop: "0.75rem",
      padding: "0.15rem",
      borderColor: state.isFocused ? "black" : "#d1d5dc",
      outline: state.isFocused ? "1px solid black" : "none",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),
  };

  return (
    <div className="px-10">
      <div className="py-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p>Bem-vindo ao painel de Uusuários!</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label className="font-bold" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3"
              {...register("username", {
                required: "Email é obrigatório",
                minLength: { value: 3, message: "Mínimo de 3 caracteres" },
              })}
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold" htmlFor="roles">
              Perfis de Usuário
            </label>
            <Controller
              control={control}
              name="roles"
              render={({ field }) => (
                <Select<RoleOption, true>
                  options={roleOptions}
                  isMulti
                  placeholder="Selecione as roles"
                  value={field.value}
                  onChange={field.onChange}
                  styles={darkSelectStyles}
                />
              )}
            />
            {errors.roles && (
              <p className="text-red-400 text-sm">
                {errors.roles.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-start gap-5 items-center mt-10">
          <button
            disabled={isSubmitting}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer max-w-60"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
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
