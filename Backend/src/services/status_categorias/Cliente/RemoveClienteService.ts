import prismaClient from "../../../prisma";

interface ClienteRequest {
    cliente_id: string;
}

class RemoveClienteService{
    async execute({cliente_id}: ClienteRequest){
        const cliente = prismaClient.cliente.delete({
            where:{
                id: cliente_id
            },
        })
        return cliente;
    }
}

export {RemoveClienteService}