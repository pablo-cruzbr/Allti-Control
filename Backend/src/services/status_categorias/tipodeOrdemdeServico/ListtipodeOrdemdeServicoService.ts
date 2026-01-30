import prismaClient from "../../../prisma"

class ListtipodeOrdemdeServicoService{
    async execute(){
        const status = await prismaClient.tipodeOrdemdeServico.findMany({
            select:{
                id: true,
                name:true,
            }
        })
        return status
    }
}

export {ListtipodeOrdemdeServicoService}

