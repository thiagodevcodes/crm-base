import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Equipe() {
    const dados = [
        { id: 1, nome: 'João', idade: 25, cidade: 'São Paulo' },
        { id: 2, nome: 'Maria', idade: 30, cidade: 'Rio de Janeiro' },
        { id: 3, nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
    ];

    return (
        <div className="px-10 py-5">
            <div className="flex justify-between items-center h-16">
                <h1 className="text-4xl font-bold ">Adicionar Colaborador</h1>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                <div className="flex flex-col w-full">
                    <Label className="mb-2">Nome</Label>
                    <Input></Input>
                </div>
                <div className="flex flex-col w-full">
                    <Label className="mb-2">Email</Label>
                    <Input></Input>
                </div>
                <div className="flex flex-col w-full">
                    <Label className="mb-2">Telefone</Label>
                    <Input></Input>
                </div>
            </div>

            <div className="flex justify-center mt-5 gap-5">
                <Button type="submit" className="cursor-pointer w-40">Enviar</Button>
                <Link href={"/admin/equipe"}>
                    <Button type="button" className="cursor-pointer w-40">Voltar</Button>
                </Link>
            </div>

        </div>
    );
}
