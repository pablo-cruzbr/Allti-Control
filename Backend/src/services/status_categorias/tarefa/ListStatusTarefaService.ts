import prismaClient from "../../../prisma";

class ListStatusTarefaService{
    async execute(){
        const category = await prismaClient.tarefa.findMany({
            select:{
                id:true,
                name: true,
            }
        })
        return category;
    }
}

export {ListStatusTarefaService}