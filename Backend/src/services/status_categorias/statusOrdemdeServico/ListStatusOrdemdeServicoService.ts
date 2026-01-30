import prismaClient from "../../../prisma";

class ListStatusOrdemdeServicoService{
    async execute(){
        const status = await prismaClient.statusOrdemdeServico.findMany({
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }
}

export {ListStatusOrdemdeServicoService}