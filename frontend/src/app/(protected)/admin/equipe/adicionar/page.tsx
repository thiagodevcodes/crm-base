'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";

type FormData = {
    name: string;
    email: string;
};

export default function Equipe() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="px-10 py-5">
            <h1 className="text-center font-bold text-3xl mb-5">Adicionar</h1>

            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="md:w-1/2 flex gap-3 flex-col">
                    <div>
                        <input className="border-[1px] px-2 py-1 w-full rounded-lg" {...register("name", { required: "Nome obrigatório" })} placeholder="Nome" />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input className="border-[1px] px-2 py-1 w-full rounded-lg" {...register("email", { required: "Email obrigatório" })} placeholder="Email" />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <button className="bg-black text-white w-full px-2 py-2 rounded-lg cursor-pointer" type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
}
