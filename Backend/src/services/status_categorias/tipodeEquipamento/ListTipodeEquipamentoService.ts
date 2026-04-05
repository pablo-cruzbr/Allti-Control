import prismaClient from "../../../prisma"

class ListtipodeEquipamentoService{
    async execute(){
        const status = await prismaClient.tipodeEquipamento.findMany({
            select:{
                id: true,
                name:true,
            }
        })
        return status
    }
}

export {ListtipodeEquipamentoService}

