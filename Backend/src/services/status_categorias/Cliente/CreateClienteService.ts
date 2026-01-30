import prismaClient from "../../../prisma";

interface ClienteRequest {
    name: string;
    endereco: string;
    cnpj: string;
}

class CreateClienteService {
    async execute({ name, endereco, cnpj }: ClienteRequest) {
        if (!name || name.trim() === '') {
            throw new Error('Nome inválido!');
        }

        if (!cnpj || cnpj.trim() === '') {
            throw new Error('CNPJ inválido!');
        }

        // Criar cliente no banco
        const cliente = await prismaClient.cliente.create({
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

export { CreateClienteService };
