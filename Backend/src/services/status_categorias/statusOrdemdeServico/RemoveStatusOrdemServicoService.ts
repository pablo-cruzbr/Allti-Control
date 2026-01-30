import prismaClient from "../../../prisma";

interface statusOrdemRequest {
    statusOrdem_id: string;
}

class RemoveStatusOrdemServicoService{
    async execute({statusOrdem_id}: statusOrdemRequest){
        const status = prismaClient.statusOrdemdeServico.delete({
            where:{
                id: statusOrdem_id
            }
        })
        return status;
    }
}

export {RemoveStatusOrdemServicoService}