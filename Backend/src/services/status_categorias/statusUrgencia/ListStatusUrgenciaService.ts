import prismaClient from "../../../prisma";

class ListStatusUrgenciaService{
    async execute(){
        const category = await prismaClient.prioridade.findMany({
            select:{
                id:true,
                name: true,
            }
        })
        return category;
    }
}

export {ListStatusUrgenciaService}