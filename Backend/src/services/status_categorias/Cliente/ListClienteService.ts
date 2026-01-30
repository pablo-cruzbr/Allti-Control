import prismaClient from "../../../prisma";

class ListClienteService{
    async execute() {
        const cliente = await prismaClient.cliente.findMany({
            orderBy: {
                created_at: "desc" // Ordena do mais recente para o mais antigo
            },
            select: {
                id: true,
                name: true,
                endereco: true,
                cnpj: true,
                created_at: true
            }
        });

        const total = await prismaClient.cliente.count();
        return {
            cliente, total};
    }
}

export {ListClienteService}