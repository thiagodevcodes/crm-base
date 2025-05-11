import Link from "next/link";
import { Button } from "@/components/ui/button";
import Table from "@/components/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Equipe() {
    const dados = [
        { id: 1, nome: 'João', idade: 25, cidade: 'São Paulo' },
        { id: 2, nome: 'Maria', idade: 30, cidade: 'Rio de Janeiro' },
        { id: 3, nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
    ];

    return (
        <div className="px-10 py-5">
            <div className="flex justify-between items-center h-16">
                <h1 className="text-4xl font-bold ">Equipe</h1>
                <Link href={"/admin/equipe/adicionar"}><Button className="cursor-pointer">Adicionar</Button></Link>
            </div>

            <Table></Table>

            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
