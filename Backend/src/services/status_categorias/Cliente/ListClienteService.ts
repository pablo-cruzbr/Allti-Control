import prismaClient from "../../../prisma";

class ListClienteService{
    async execute() {
        const cliente = await prismaClient.cliente.findMany({
            orderBy: {
                created_at: "desc" 
            },
            select: {
                id: true,
                name: true,
                endereco: true,
                telefone: true,
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