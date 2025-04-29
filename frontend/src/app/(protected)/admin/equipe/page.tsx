export default function Equipe() {
    const dados = [
        { id: 1, nome: 'João', idade: 25, cidade: 'São Paulo' },
        { id: 2, nome: 'Maria', idade: 30, cidade: 'Rio de Janeiro' },
        { id: 3, nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
    ];

    return (
        <div className="px-5 py-5">
            <h1 className="text-4xl font-bold">Equipe</h1>
            <table className="min-w-full mt-5">
                <thead className="bg-gray-200 border border-gray-300 rounded-full">
                    <tr>
                        <th className=" px-4 py-2">Nome</th>
                        <th className=" px-4 py-2">Idade</th>
                        <th className=" px-4 py-2">Cidade</th>
                    </tr>
                </thead>
                <tbody className="border-gray-300 border">
                    {dados.map((usuario, index) => (
                        <tr key={usuario.id} className={`${ index % 2 == 0 ? "bg-white" : "bg-gray-200"} hover:bg-gray-100`}>
                            <td className="text-center px-4 py-2">{usuario.nome}</td>
                            <td className="text-center px-4 py-2">{usuario.idade}</td>
                            <td className="text-center px-4 py-2">{usuario.cidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
