import prismaClient from "../../../prisma";

class ListStatusUrgenciaService{
    async execute(){
        const category = await prismaClient.urgencia.findMany({
            select:{
                id:true,
                name: true,
            }
        })
        return category;
    }
}

export {ListStatusUrgenciaService}