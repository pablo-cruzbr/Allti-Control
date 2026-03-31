import prismaClient from "../../../prisma";

interface ClienteRequest {
    name: string;
    endereco: string;
    cnpj: string;
    telefone: string
}

class CreateClienteService {
    async execute({ name, endereco, cnpj, telefone }: ClienteRequest) {
        if (!name || name.trim() === '') {
            throw new Error('Nome inválido!');
        }

        if (!cnpj || cnpj.trim() === '') {
            throw new Error('CNPJ inválido!');
        }

        const cliente = await prismaClient.cliente.create({
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
                cnpj: true,
                telefone: true
            }
        });

        return cliente;
    }
}

export { CreateClienteService };
