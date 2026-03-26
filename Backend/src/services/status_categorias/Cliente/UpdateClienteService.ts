import prismaClient from "../../../prisma";

interface ClienteRequest {
    id: string; 
    name: string;
    endereco: string;
    cnpj: string;
}

class UpdateClienteService {
    async execute({ id, name, endereco, cnpj }: ClienteRequest) {
        if (!id) {
            throw new Error('ID do cliente é obrigatório para atualização!');
        }

        if (!name || name.trim() === '') {
            throw new Error('Nome inválido!');
        }

        if (!cnpj || cnpj.trim() === '') {
            throw new Error('CNPJ inválido!');
        }

        // 1. Opcional: Verificar se o cliente existe antes (Evita erro 500 do Prisma)
        const clienteExists = await prismaClient.cliente.findUnique({
            where: { id }
        });

        if (!clienteExists) {
            throw new Error('Cliente não encontrado!');
        }

        // 2. Executar o update
        const cliente = await prismaClient.cliente.update({
            where: {
                id: id // Agora o ID vem da interface
            },
            data: {
                name,
                endereco,
                cnpj
            },
            select: {
                id: true,
                name: true,
                endereco: true,
                cnpj: true
            }
        });

        return cliente;
    }
}

export { UpdateClienteService };