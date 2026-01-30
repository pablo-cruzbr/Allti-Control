import prismaClient from "../../../prisma"

class ListtipodeChamadoService{
    async execute(){
        const status = await prismaClient.tipodeChamado.findMany({
            select:{
                id: true,
                name:true,
            }
        })
        return status
    }
}

export {ListtipodeChamadoService}

