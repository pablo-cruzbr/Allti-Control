import prismaClient from "../../../prisma";

interface ClienteRequest {
    id: string; 
    name: string;
    endereco: string;
    telefone: string;
    cnpj: string;
}

class UpdateClienteService {
    async execute({ id, name, endereco, cnpj, telefone }: ClienteRequest) {
        if (!id) {
            throw new Error('ID do cliente é obrigatório para atualização!');
        }

        if (!name || name.trim() === '') {
            throw new Error('Nome inválido!');
        }

        if (!cnpj || cnpj.trim() === '') {
            throw new Error('CNPJ inválido!');
        }

        const clienteExists = await prismaClient.cliente.findUnique({
            where: { id }
        });

        if (!clienteExists) {
            throw new Error('Cliente não encontrado!');
        }

        const cliente = await prismaClient.cliente.update({
            where: {
                id: id 
            },
            data: {
                name,
                endereco,
                cnpj,
                telefone
            },
            select: {
                id: true,
                name: true,
                endereco: true,
                telefone: true,
                cnpj: true
            }
        });

        return cliente;
    }
}

export { UpdateClienteService };