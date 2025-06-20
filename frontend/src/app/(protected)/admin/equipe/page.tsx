import Link from "next/link";
import Table from "@/components/table";

export default function Equipe() {
    const dados = [
        { id: 1, nome: 'João', idade: 25, cidade: 'São Paulo' },
        { id: 2, nome: 'Maria', idade: 30, cidade: 'Rio de Janeiro' },
        { id: 3, nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
    ];

    return (
        <div className="">
            <div className="flex justify-between items-center h-16">
                <h1 className="text-4xl font-bold ">Equipe</h1>
                <Link href={"/admin/equipe/adicionar"} className="bg-black text-white px-5 py-2 rounded-2xl">Adicionar</Link>
            </div>

            <Table/>
        </div>
    );
}
