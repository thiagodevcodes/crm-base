import Link from 'next/link';
import React from 'react';

const dados = [
    { id: 1, nome: 'João', idade: 25, cidade: 'São Paulo' },
    { id: 2, nome: 'Maria', idade: 30, cidade: 'Rio de Janeiro' },
    { id: 3, nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
];

const Table = () => {
    return (
        <div className="overflow-x-auto">
            
            <table className="min-w-full mt-5 w-40 divide-y divide-gray-200 border border-gray-300">
                <thead className="bg-gray-200 border border-gray-300 rounded-full">
                    <tr>
                        <th className=" px-4 py-2">Nome</th>
                        <th className=" px-4 py-2">Idade</th>
                        <th className=" px-4 py-2">Cidade</th>
                        <th>Acões</th>
                    </tr>
                </thead>
                <tbody className="border-gray-300 border">
                    {dados.map((usuario, index) => (
                        <tr key={usuario.id} className={`${index % 2 == 0 ? "bg-white" : "bg-gray-200"} hover:bg-gray-100`}>
                            <td className="text-center px-4 py-2">{usuario.nome}</td>
                            <td className="text-center px-4 py-2">{usuario.idade}</td>
                            <td className="text-center px-4 py-2">{usuario.cidade}</td>
                            <td className="text-center px-4 py-2 flex items-center justify-center gap-2">
                                <Link href={"/"} className="bg-blue-500 hover:bg-blue-800 cursor-pointer text-white px-5 py-2 rounded-2xl">Editar</Link>
                                <Link href={"/"} className="bg-red-500 hover:bg-red-800 cursor-pointer text-white px-5 py-2 rounded-2xl">Excluir</Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default Table;
